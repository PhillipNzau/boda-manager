import { Component, input, output } from '@angular/core';
import { FormField } from '../../../auth/models/form-field.model';

@Component({
  selector: 'app-input',
  imports: [],
  template: `
    <div class="field" [class.has-error]="field().showError()">
      <label>{{ inputLabel() }}</label>
      <input
        [type]="inputType()"
        [placeholder]="inputPlaceholder()"
        [value]="field().value()"
        [attr.autocomplete]="inputLabel()"
        (input)="handleInput($event)"
        (blur)="handleBlur()"
      />
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

  handleInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.field().value.set(val);
  }

  handleBlur() {
    this.field().touched.set(true); // only show errors after user leaves the field
  }
}
