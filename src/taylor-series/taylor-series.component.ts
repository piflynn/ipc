import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { TaylorSeriesPiResult } from 'src/models';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { integerValidator } from './integer-validator';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  selector: 'app-taylor-series',
  templateUrl: './taylor-series.component.html',
  styleUrl: './taylor-series.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaylorSeriesComponent {
  results: TaylorSeriesPiResult[] = [];
  iterationsInput = new FormControl(20, [
    Validators.required,
    integerValidator(),
  ]);
  onEnterPress(value: string) {
    if (this.iterationsInput.valid) {
      this.estimatePi(value);
    }
  }
  estimatePi(input: string) {
    const iterations = parseInt(input);
    const results = [];
    let sum = 0;
    let i = 1;
    let iteration = 1;
    while (iteration <= iterations) {
      const exp = (i - 1) / 2;

      sum += Math.pow(-1, exp) * (Math.pow(1, i) / i);

      const pi = 4 * sum;
      const error = Math.abs(pi - Math.PI);
      const percentError = (error / Math.PI) * 100;

      results.push({ i, pi, error, percentError });
      i += 2;
      iteration++;
    }
    this.results = results;
  }
}
