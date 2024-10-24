import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { catchError, from, map, mergeMap, of, switchMap, timer, toArray } from 'rxjs';
import { DisplayImage, StreamBlob } from 'src/models';
import { OrchidService } from 'src/orchid.service';
@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent implements OnInit {
  private readonly requestConcurrency = 2;
  private readonly destroyRef = inject(DestroyRef);
  private readonly pollingInterval$ = timer(0, 10 * 1000); // use timer to create 5 second polling interval
  images: DisplayImage[] = [];

  constructor(private orchid: OrchidService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.orchid
    .createUserSession()
    .pipe(
      // use polling to refetch
      switchMap((session) =>
        this.pollingInterval$.pipe(
          switchMap(() => this.getPrimaryFrames(session.id))
        )
      ),
      // stop polling on component destroy
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(
      (frames) =>{
        this.images = frames
          .sort((a, b) => b.stream.id - a.stream.id)
          .map((frame) => ({
            id: frame.stream.id,
            name: frame.stream.name,
            url: URL.createObjectURL(frame.blob),
          }));
        this.cd.markForCheck();
      }
        
    );

  // timer(0, 5 * 1000)
  //   .pipe(takeUntilDestroyed(this.destroyRef))
  //   .subscribe(() => {
  //     console.log('hi')

  //     const timestamp = new Date().getTime();
  //     this.images = this.images.map(image => ({...image, url: `${image.url}?t=${timestamp}`}));
  //     console.log(this.images[0])
  //   });
  }

    /**
   * Gets the frame image urls (as blobs) and stream data
   *
   * @remarks
   * Get all 'live': 'primary' streams, fetch frame by streamId.
   * Return stream and blob in an object (StreamBlob).
   * Use concurrency property with mergeMap to limit concurrent requests on server.
   * Use catchError to make sure all requests complete (without getting canceled).
   *
   * @param sessionId - The userSession Id
   * @returns an object containing the blob imageUrl from the frame and the associated stream
   *
   */
    private getPrimaryFrames(sessionId: string) {
      return this.orchid.getStreams(sessionId).pipe(
        map((res) => res.streams),
        switchMap((streams) =>
          from(streams).pipe(
            mergeMap(
              (stream) =>
                this.orchid.getFrame(sessionId, stream.id).pipe(
                  map((blob) => ({ stream, blob } as StreamBlob)),
                  // TODO: Add more robust error handling
                  catchError((err) => of()) // prevents successive requests from getting canceled after a failure
                ),
              this.requestConcurrency
            ),
            toArray()
          )
        )
      );
    }
}
