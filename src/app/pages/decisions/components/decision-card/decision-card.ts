import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import type { Decision } from '../../../../core/db/database';

@Component({
  selector: 'app-decision-card',
  imports: [DatePipe],
  templateUrl: './decision-card.html',
  styleUrl: './decision-card.scss',
})
export class DecisionCardComponent {
  decision = input.required<Decision>();
  delete = output<string>();
}
