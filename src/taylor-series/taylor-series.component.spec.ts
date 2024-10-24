import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaylorSeriesComponent } from './taylor-series.component';

describe('TaylorSeriesComponent', () => {
  let component: TaylorSeriesComponent;
  let fixture: ComponentFixture<TaylorSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaylorSeriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaylorSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
