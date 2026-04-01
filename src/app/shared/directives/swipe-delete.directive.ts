import { Directive, ElementRef, inject, NgZone, OnDestroy, output } from '@angular/core';

@Directive({ selector: '[appSwipeDelete]' })
export class SwipeDeleteDirective implements OnDestroy {
  readonly deleted = output<void>();

  private readonly el = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly zone = inject(NgZone);
  private startX = 0;
  private dx = 0;
  private active = false;

  constructor() {
    this.el.style.touchAction = 'pan-y';
    this.el.addEventListener('pointerdown', this.onDown);
    this.el.addEventListener('pointermove', this.onMove);
    this.el.addEventListener('pointerup', this.onUp);
    this.el.addEventListener('pointercancel', this.reset);
  }

  ngOnDestroy(): void {
    this.el.removeEventListener('pointerdown', this.onDown);
    this.el.removeEventListener('pointermove', this.onMove);
    this.el.removeEventListener('pointerup', this.onUp);
    this.el.removeEventListener('pointercancel', this.reset);
  }

  private readonly onDown = (e: PointerEvent) => {
    this.startX = e.clientX;
    this.active = true;
    this.dx = 0;
    this.el.style.transition = 'none';
    this.el.setPointerCapture(e.pointerId);
  };

  private readonly onMove = (e: PointerEvent) => {
    if (!this.active) return;
    this.dx = e.clientX - this.startX;
    if (this.dx >= 0) return;
    this.el.style.transform = `translateX(${this.dx}px)`;
    this.el.style.opacity = String(Math.max(0.2, 1 + this.dx / 150));
  };

  private readonly onUp = () => {
    if (!this.active) return;
    this.active = false;
    if (this.dx < -80) {
      this.el.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
      this.el.style.transform = 'translateX(-110%)';
      this.el.style.opacity = '0';
      setTimeout(() => this.zone.run(() => this.deleted.emit()), 220);
    } else {
      this.reset();
    }
  };

  private readonly reset = () => {
    this.active = false;
    this.dx = 0;
    this.el.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
    this.el.style.transform = '';
    this.el.style.opacity = '';
  };
}
