// form-field.model.ts
import { signal, computed } from '@angular/core';

export interface Validator {
  validate: (value: string) => string | null;
}

export function required(message = 'This field is required'): Validator {
  return { validate: (v) => (v.trim() ? null : message) };
}

export function minLength(min: number, message?: string): Validator {
  return {
    validate: (v) =>
      v.length >= min ? null : (message ?? `Min ${min} characters`),
  };
}

export function emailValidator(message = 'Invalid email'): Validator {
  return {
    validate: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : message),
  };
}

export function createField(initial: string, validators: Validator[] = []) {
  const value = signal(initial);
  const touched = signal(false);

  const errors = computed(() => {
    return validators
      .map((v) => v.validate(value()))
      .filter((e): e is string => e !== null);
  });

  const error = computed(() => errors()[0] ?? null);
  const valid = computed(() => errors().length === 0);
  const showError = computed(() => touched() && error() !== null);

  return { value, touched, errors, error, valid, showError };
}

export type FormField = ReturnType<typeof createField>;
