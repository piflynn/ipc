import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaylorSeriesComponent } from './taylor-series.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('TaylorSeriesComponent', () => {
  let component: TaylorSeriesComponent;
  let fixture: ComponentFixture<TaylorSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaylorSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onPressEnter', () => {
    it('should call estimatePi if the iterations control is valid', () => {
      const piSpy = jest.spyOn(component, 'estimatePi');
      component.onEnterPress('20');
      expect(piSpy).toHaveBeenCalledWith('20');
    });
  });

  describe('estimatePi', () => {
    it('should return results', () => {
      component.estimatePi('20');
      expect(component.results).toHaveLength(20);
    });
  });
});
