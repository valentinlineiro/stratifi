import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { Decision } from '../../../../core/db/database';

@Component({
  selector: 'app-decision-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './decision-card.html',
  styleUrl: './decision-card.scss',
})
export class DecisionCardComponent {
  decision = input.required<Decision>();
  delete = output<string>();
}
