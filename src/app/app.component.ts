import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { AppLinks } from '../models';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet, MatToolbarModule, MatButtonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  BUTTON_LINKS = AppLinks;

  constructor(private router: Router) {}

  onButtonLinkClick(link: AppLinks) {
    this.router.navigate([link]);
  }
}
