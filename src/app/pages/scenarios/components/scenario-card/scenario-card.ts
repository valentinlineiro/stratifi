import { Component, input, output } from '@angular/core';
import { RadarChartComponent } from '../../../../shared/components/radar-chart/radar-chart';
import { SwipeDeleteDirective } from '../../../../shared/directives/swipe-delete.directive';
import type { Scenario } from '../../../../core/db/database';

@Component({
  selector: 'app-scenario-card',
  imports: [RadarChartComponent, SwipeDeleteDirective],
  templateUrl: './scenario-card.html',
  styleUrl: './scenario-card.scss',
})
export class ScenarioCardComponent {
  scenario = input.required<Scenario>();
  delete = output<string>();

  get hasOutcomes(): boolean {
    return Object.keys(this.scenario().outcomes).length > 0;
  }
}
