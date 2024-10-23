import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  catchError,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  timer,
  toArray,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { OrchidService } from './orchid.service';
import { DisplayImage, StreamBlob } from './models';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatCardModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly requestConcurrency = 2;
  readonly destroyRef = inject(DestroyRef);
  private readonly pollingInterval$ = timer(0, 5 * 1000); // use timer to create 5 second polling interval
  images: DisplayImage[] = [];

  constructor(private orchid: OrchidService) {}

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
        (frames) =>
          (this.images = frames
            .sort((a, b) => b.stream.id - a.stream.id)
            .map((frame) => ({name: frame.stream.name, url: URL.createObjectURL(frame.blob)})))
      );
  }
  
    /**
   * Gets the frame image urls (as blobs) and stream data
   *
   * @remarks
   * 
   *
   * @param sessionId - The userSession Id
   * @returns an object containing the blob imageUrl from the frame and the associated stream
   *
   * @beta
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
