import { TestBed } from '@angular/core/testing';

import { OrchidService } from './orchid.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  mockFrame,
  mockSessionId,
  mockStreamId,
  mockStreams,
  mockUserSession,
} from './test-mocks';

describe('OrchidService', () => {
  let service: OrchidService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(OrchidService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('createUserSession', () => {
    it('should post to user session endpoint', (done) => {
      service.createUserSession().subscribe((res) => {
        expect(res).toEqual(mockUserSession);
        done();
      });
      httpController
        .expectOne({
          method: 'POST',
          url: 'https://orchid.ipconfigure.com/service/sessions/user',
        })
        .flush(mockUserSession);
    });
  });

  describe('getStreams', () => {
    it('should get streams', (done) => {
      service.getStreams(mockSessionId).subscribe((res) => {
        expect(res).toEqual(mockStreams);
        done();
      });
      httpController
        .expectOne({
          method: 'GET',
          url: `https://orchid.ipconfigure.com/service/streams?sid=${mockSessionId}&live=primary`,
        })
        .flush(mockStreams);
    });
  });

  describe('getFrame', () => {
    it('should get frame', (done) => {
      service.getFrame(mockSessionId, mockStreamId).subscribe((res) => {
        expect(res).toEqual(mockFrame);
        done();
      });
      httpController
        .expectOne({
          method: 'GET',
          url: `https://orchid.ipconfigure.com/service/streams/${mockStreamId}/frame?sid=${mockSessionId}&fallback=true&width=400&height=400`,
        })
        .flush(mockFrame);
    });
  });
});
