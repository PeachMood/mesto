import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(initForm, handleFormSubmit, popupSelector) {
    super(popupSelector);

    this._initForm = initForm;
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.form');

    this._inputElements = new Map();
    const inputElements = Array.from(this._formElement.querySelectorAll('.form__input'));
    inputElements.forEach(inputElement => this._inputElements.set(inputElement.name, inputElement));
  }

  open() {
    this._initForm();
    super.open();
  }

  _getInputValues() {
    const inputValues = {};
    this._inputElements.forEach((inputElement, inputName) => inputValues[inputName] = inputElement.value);
    return inputValues;
  }

  setInputValues(inputValues) {
    for (const [inputName, inputValue] of Object.entries(inputValues)) {
      const inputElement = this._inputElements.get(inputName);
      inputElement.value = inputValue;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', event => this._handleFormSubmit(event, this._getInputValues()));
  }

  resetForm() {
    this._formElement.reset();
  }
}
