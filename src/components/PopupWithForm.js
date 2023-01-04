import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, resetFormCallback) {
    super(popupSelector);
    this._resetFormCallback = resetFormCallback;
    this._handleFormSubmit = handleFormSubmit;
    this._setFormElements();
  }

  _setFormElements() {
    this._formElement = this._popupElement.querySelector('.form');
    this._buttonSubmit = this._popupElement.querySelector('.form__submit');

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

  loading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = 'Сохранить';
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
    this.reset();
    this._resetFormCallback();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', event => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
