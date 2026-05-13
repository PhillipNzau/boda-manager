import { trigger, transition, style, animate } from '@angular/animations';

export const bottomSheetAnimation = trigger('bottomSheet', [
  transition(':enter', [
    style({ transform: 'translateY(100%)' }),
    animate(
      '300ms cubic-bezier(0.32, 0.72, 0, 1)',
      style({ transform: 'translateY(0)' }),
    ),
  ]),
  transition(':leave', [
    animate(
      '300ms cubic-bezier(0.32, 0.72, 0, 1)',
      style({ transform: 'translateY(100%)' }),
    ),
  ]),
]);

export const backdropAnimation = trigger('backdrop', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('300ms ease', style({ opacity: 0 }))]),
]);
