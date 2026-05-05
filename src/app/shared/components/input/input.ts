import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  template: `
    <div class="field">
      <label>{{ inputLabel() }}</label>
      <input
        type="{{ inputType() }}"
        placeholder="{{ inputPlaceholder() }}"
        autocomplete="{{ inputLabel() }}"
        (input)="handleValueChange($event)"
      />
    </div>
  `,
  styleUrl: './input.css',
})
export class Input {
  inputLabel = input.required<string>();
  inputType = input.required<string>();
  inputPlaceholder = input.required<string>();
  valueChange = output<any>();

  handleValueChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }
}
