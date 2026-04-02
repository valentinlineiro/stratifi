import { Component, inject, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SwipeDeleteDirective } from '../../../../shared/directives/swipe-delete.directive';
import { I18nService } from '../../../../core/i18n/i18n.service';
import type { Decision } from '../../../../core/db/database';

@Component({
  selector: 'app-decision-card',
  imports: [DatePipe, RouterLink, SwipeDeleteDirective],
  templateUrl: './decision-card.html',
  styleUrl: './decision-card.scss',
})
export class DecisionCardComponent {
  readonly t = inject(I18nService).t;
  decision = input.required<Decision>();
  delete = output<string>();
}
