import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreamsResponse, UserSession } from './models';

@Injectable({
  providedIn: 'root',
})
export class OrchidService {
  readonly orchidApiBaseUrl = 'https://orchid.ipconfigure.com';

  constructor(private http: HttpClient) {}

  createUserSession() {
    return this.http.post<UserSession>(
      `${this.orchidApiBaseUrl}/service/sessions/user`,
      {
        username: 'liveviewer',
        password: 'tpain',
        expiresIn: 1000000,
        cookie: 'session',
      }
    );
  }

  getStreams(sessionId: string) {
    return this.http.get<StreamsResponse>(
      `${this.orchidApiBaseUrl}/service/streams`,
      {
        params: { sid: sessionId, live: 'primary' },
      }
    );
  }

  getFrame(sessionId: string, streamId: number) {
    return this.http.get(
      `${this.orchidApiBaseUrl}/service/streams/${streamId}/frame`,
      {
        params: {
          sid: sessionId,
          fallback: true,
          // time: 0,
          width: 400,
          height: 400
        },
        responseType: 'blob',
        headers: { Accept: 'image/jpeg' },
      }
    );
  }

}
