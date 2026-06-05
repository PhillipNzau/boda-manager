import { Component, input, output, signal } from '@angular/core';
import { FormField } from '../../../auth/models/form-field.model';

@Component({
  selector: 'app-input',
  imports: [],
  template: `
    <div class="field" [class.has-error]="field().showError()">
      <label>{{ inputLabel() }}</label>
      <div
        class="flex items-center gap-2 border border-solid border-white/10 rounded-sm bg-white/10"
      >
        <input
          [type]="inputType() === 'password' ? inputTypes() : inputType()"
          [placeholder]="inputPlaceholder()"
          [value]="field().value()"
          [attr.autocomplete]="inputLabel()"
          (input)="handleInput($event)"
          (blur)="handleBlur()"
        />
        @if (inputType() === 'password') {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-gray-300 "
            (click)="toggleVisibility()"
          >
            <path
              d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
            />
            @if (inputTypes() === 'password') {
              <path d="m2 2 20 20" />
            }

            <circle cx="12" cy="12" r="3" />
          </svg>
        }
      </div>
      @if (field().showError()) {
        <span class="error-msg">{{ field().error() }}</span>
      }
    </div>
  `,
  styleUrl: './input.css',
})
export class Input {
  inputLabel = input.required<string>();
  inputType = input.required<string>();
  inputPlaceholder = input.required<string>();
  field = input.required<FormField>();
  isVisible = signal<boolean>(false);
  inputTypes = signal<'password' | 'text'>('password');

  handleInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.field().value.set(val);
  }

  toggleVisibility() {
    this.isVisible.set(!this.isVisible);
    this.inputTypes.update((current) =>
      current === 'password' ? 'text' : 'password',
    );
  }
  handleBlur() {
    this.field().touched.set(true); // only show errors after user leaves the field
  }
}
