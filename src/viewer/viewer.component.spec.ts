import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerComponent } from './viewer.component';
import { OrchidService } from 'src/orchid/orchid.service';
import { ChangeDetectorRef } from '@angular/core';
import { mockFrame, mockStreams, mockUserSession } from 'src/orchid/test-mocks';
import { of } from 'rxjs';

describe('ViewerComponent', () => {
  let component: ViewerComponent;
  let fixture: ComponentFixture<ViewerComponent>;
  let cd: ChangeDetectorRef;
  let cdSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewerComponent],
      providers: [
        {
          provide: OrchidService,
          useValue: {
            createUserSession: jest.fn().mockReturnValue(of(mockUserSession)),
            getStreams: jest.fn().mockReturnValue(mockStreams),
            getFrame: jest.fn().mockReturnValue(mockFrame),
          },
        },
        {
          provide: ChangeDetectorRef,
          useValue: { markForCheck: jest.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewerComponent);
    component = fixture.componentInstance;
    cd = TestBed.inject(ChangeDetectorRef);
    cdSpy = jest.spyOn(cd, 'markForCheck');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
