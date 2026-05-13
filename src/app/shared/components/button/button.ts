import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button
      [class]="
        isValid() ? 'btn-primary' : 'btn-primary bg-white! text-slate-400!'
      "
      (click)="onBackdropClick($event)"
      [disabled]="isSubmitting()"
    >
      @if (isSubmitting()) {
        <span class="spinner"></span> Loading...
      } @else {
        {{ buttonTitle() }}
      }
    </button>
  `,
  styleUrl: './button.css',
})
export class Button {
  buttonTitle = input.required<string>();
  buttonClick = output<void>();
  isValid = input<boolean>();
  isSubmitting = input<boolean>();

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.buttonClick.emit();
    }
  }
}
