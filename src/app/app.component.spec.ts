import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppLinks } from 'src/models';
import { Router, provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let navSpy: jest.SpyInstance;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(appRoutes)],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    router = TestBed.inject(Router);
    navSpy = jest.spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it(`should have a title 'IPC'`, () => {
    expect(app.title).toEqual('IPC');
  });

  describe('onButtonClick', () => {
    it('should call router.navigate', () => {
      app.onButtonLinkClick(AppLinks.TAYLOR_SERIES);
      expect(navSpy).toHaveBeenCalledWith([AppLinks.TAYLOR_SERIES]);
    });
  });
});
