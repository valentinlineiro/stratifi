import { Component, input, output } from '@angular/core';
import type { Scenario } from '../../../../core/db/database';

@Component({
  selector: 'app-scenario-card',
  templateUrl: './scenario-card.html',
  styleUrl: './scenario-card.scss',
})
export class ScenarioCardComponent {
  scenario = input.required<Scenario>();
  delete = output<string>();
}
