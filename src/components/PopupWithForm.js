import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  constructor(reseter, handleFormSubmit, popupSelector) {
    super(popupSelector);

    this._reseter = reseter;
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.form');

    this._inputElements = new Map();
    const inputElements = Array.from(this._formElement.querySelectorAll('.form__input'));
    inputElements.forEach(inputElement => this._inputElements.set(inputElement.name, inputElement));
  }

  _getInputValues() {
    const inputValues = {};
    this._inputElements.forEach((inputElement, inputName) => inputValues[inputName] = inputElement.value);
    return inputValues;
  }

  _setInputValues(inputValues) {
    for (const [inputName, inputValue] of Object.entries(inputValues)) {
      const inputElement = this._inputElements.get(inputName);
      inputElement.value = inputValue;
    }
  }

  reset() {
    this._formElement.reset();
  }

  open(inputValues) {
    if (inputValues) {
      this._setInputValues(inputValues);
    }
    super.open();
  }

  close() {
    super.close();
    this._reseter();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', event => this._handleFormSubmit(event, this._getInputValues()));
  }
}
