/**
 * Form validation via JS
 */

import { countries } from './country-list.js';

const form = document.querySelector('form');
const validations = [];

/** @type {(selector: string, checks: (field: HTMLInputElement, validity: ValidityState) => string | undefined) => void} */
function addValidation(selector, checks) {
  /** @type HTMLInputElement */
  const field = form.querySelector(selector);
  const message = form.querySelector(`${selector} ~ span`);
  const { validity } = field;

  function validation() {
    field.classList.add('has-been-validated');

    field.setCustomValidity('');
    message.classList.add('invisible');

    const text = checks(field, validity);
    if (text) {
      field.setCustomValidity(text);
      message.classList.remove('invisible');
      message.textContent = text;
    }
  }
  validations.push(validation);
  field.addEventListener('focusout', validation);

  field.addEventListener('focusin', () => {
    field.classList.remove('has-been-validated');
  });
}

addValidation('input[name=email]', (field, validity) => {
  if (!validity.valid) {
    /**
     * Email validation is finicky and is best left up to the browser's implementation
     * (which seems to essentially just require "@"...)
     * https://www.html5pattern.com/Emails
     */
    return 'Please enter a valid email.';
  }
});
addValidation('input[name=country]', (field, validity) => {
  if (validity.valueMissing) {
    return 'Please enter a country.';
  }
  if (!countries.includes(field.value)) {
    return `Possibly non-existent ('${field.value}')`;
  }
});
addValidation('input[name=zip]', (field, validity) => {
  /**
   * Because this field is not required, an empty input is
   * considered valid and does not trigger a pattern mismatch.
   */

  if (field.value.match(/[^a-z0-9\- ]/i)) {
    return 'Contains invalid characters.';
  }
  if (validity.tooShort) {
    return 'May be too short.';
  }
  if (validity.tooLong) {
    return 'May be too long.';
  }
  if (validity.patternMismatch) {
    return 'May be non-standard.';
  }
});
addValidation('input[name=password]', (field, validity) => {
  if (validity.valueMissing) {
    return 'Please enter a password.';
  }
  if (validity.tooShort) {
    return 'Must be at least 8 characters.';
  }
  if (!field.value.match(/[a-z]/)) {
    return 'Must have a lowercase character.';
  }
  if (!field.value.match(/[A-Z]/)) {
    return 'Must have an uppercase character.';
  }
  if (!field.value.match(/[\d]/)) {
    return 'Must have a number.';
  }
  if (!field.value.match(/[\W_]/)) {
    return 'Must have a special character.';
  }
  if (validity.patternMismatch) {
    return 'Contains unsupported characters.';
  }
});
addValidation('input[name=password-confirmation]', (field, validity) => {
  const password = form.querySelector('input[name=password]').value;
  if (!password) {
    return 'Please enter a password.';
  }
  if (field.value !== password) {
    return 'Passwords do not match.';
  }
});

form.addEventListener('submit', (event) => {
  for (const validate of validations) {
    validate();
  }
  const isValid = form.checkValidity();

  if (!isValid) {
    event.preventDefault();
    return;
  }

  alert('Nice!');
});
form.addEventListener('reset', () => {
  const fields = form.querySelectorAll('input');
  for (const field of fields) {
    field.classList.remove('has-been-validated');
    field.setCustomValidity('');
  }

  const messages = form.querySelectorAll('input ~ span');
  for (const message of messages) {
    message.classList.add('invisible');
  }
});
