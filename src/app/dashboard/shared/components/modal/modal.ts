import { Component, input, output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-modal',
  standalone: true, // Standard in modern Angular
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
  animations: [
    trigger('fade', [
      // When the element enters the DOM via @if
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in-out', style({ opacity: 1 })),
      ]),
      // When the element is removed from the DOM via @if
      transition(':leave', [
        animate('200ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class Modal {
  // Using the new Signal-based inputs
  showModal = input<boolean>(false);
  width = input<string>('auto');

  backdropClick = output<void>();

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.backdropClick.emit();
    }
  }
}
