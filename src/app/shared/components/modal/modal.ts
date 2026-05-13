import { Component, input, output } from '@angular/core';
import { bottomSheetAnimation, backdropAnimation } from './animationsTrigger';

@Component({
  selector: 'app-modal',
  animations: [bottomSheetAnimation, backdropAnimation],
  standalone: true,
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  showModal = input<boolean>(false);
  width = input<string>('auto');
  borderColor = input<string>('auto');
  justifyTop = input<string>('auto');
  backdropClick = output<void>();

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.backdropClick.emit();
    }
  }
}
