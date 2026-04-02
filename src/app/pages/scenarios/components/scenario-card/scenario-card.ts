import { Component, inject, input, output } from '@angular/core';
import { RadarChartComponent } from '../../../../shared/components/radar-chart/radar-chart';
import { SwipeDeleteDirective } from '../../../../shared/directives/swipe-delete.directive';
import { I18nService } from '../../../../core/i18n/i18n.service';
import type { Scenario } from '../../../../core/db/database';

@Component({
  selector: 'app-scenario-card',
  imports: [RadarChartComponent, SwipeDeleteDirective],
  templateUrl: './scenario-card.html',
  styleUrl: './scenario-card.scss',
})
export class ScenarioCardComponent {
  readonly t = inject(I18nService).t;
  scenario = input.required<Scenario>();
  delete = output<string>();

  get hasOutcomes(): boolean {
    return Object.keys(this.scenario().outcomes).length > 0;
  }
}
