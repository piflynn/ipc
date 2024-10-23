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
import { DisplayImage } from './models';

@Component({
  standalone: true,
  imports: [RouterModule],
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

  private getPrimaryFrames(sessionId: string) {
    return this.orchid.getStreams(sessionId).pipe(
      map((res) => res.streams),
      switchMap((streams) =>
        from(streams).pipe(
          mergeMap(
            (stream) =>
              this.orchid.getFrame(sessionId, stream.id).pipe(
                map((blob) => ({ stream, blob })),
                catchError((err) => of())
              ),
            this.requestConcurrency
          ),
          toArray()
        )
      )
    );
  }
}
