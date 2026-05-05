import { Component, EventEmitter, input, output, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button class="btn-primary" (click)="onBackdropClick($event)">
      {{ buttonTitle() }}
    </button>
  `,
  styleUrl: './button.css',
})
export class Button {
  buttonTitle = input.required<string>();
  buttonClick = output<void>();

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.buttonClick.emit();
    }
  }
}
