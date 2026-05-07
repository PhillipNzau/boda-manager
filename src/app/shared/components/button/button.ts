import { Component, EventEmitter, input, output, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button
      [class]="
        isValid() ? 'btn-primary' : 'btn-primary bg-white! text-slate-400!'
      "
      (click)="onBackdropClick($event)"
    >
      {{ buttonTitle() }}
    </button>
  `,
  styleUrl: './button.css',
})
export class Button {
  buttonTitle = input.required<string>();
  buttonClick = output<void>();
  isValid = input<boolean>();

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.buttonClick.emit();
    }
  }
}
