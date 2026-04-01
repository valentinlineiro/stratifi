import { Component, computed, input } from '@angular/core';
import { OUTCOME_AXES } from '../../../core/constants/outcome-axes';

interface Point { x: number; y: number; }

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.html',
  styleUrl: './radar-chart.scss',
})
export class RadarChartComponent {
  values = input.required<Record<string, number>>();
  size = input(140);

  readonly axes = OUTCOME_AXES;
  readonly levels = [1, 2, 3, 4, 5];

  get cx(): number { return this.size() / 2; }
  get cy(): number { return this.size() / 2; }
  get radius(): number { return this.size() * 0.34; }
  get labelRadius(): number { return this.radius + 14; }

  angle(i: number): number {
    return (2 * Math.PI * i / this.axes.length) - Math.PI / 2;
  }

  point(i: number, ratio: number): Point {
    const a = this.angle(i);
    return {
      x: this.cx + ratio * this.radius * Math.cos(a),
      y: this.cy + ratio * this.radius * Math.sin(a),
    };
  }

  gridPolygon(level: number): string {
    return this.axes
      .map((_, i) => { const p = this.point(i, level / 5); return `${p.x},${p.y}`; })
      .join(' ');
  }

  readonly dataPolygon = computed(() =>
    this.axes
      .map((axis, i) => {
        const v = this.values()[axis.key] ?? 0;
        const p = this.point(i, v / 5);
        return `${p.x},${p.y}`;
      })
      .join(' ')
  );

  labelPos(i: number): Point {
    const a = this.angle(i);
    return {
      x: this.cx + this.labelRadius * Math.cos(a),
      y: this.cy + this.labelRadius * Math.sin(a),
    };
  }

  textAnchor(i: number): string {
    const x = Math.cos(this.angle(i));
    if (Math.abs(x) < 0.2) return 'middle';
    return x > 0 ? 'start' : 'end';
  }

  dominantBaseline(i: number): string {
    const y = Math.sin(this.angle(i));
    if (Math.abs(y) < 0.2) return 'middle';
    return y > 0 ? 'hanging' : 'auto';
  }
}
