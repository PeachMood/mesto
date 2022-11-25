export class FormValidator {
  _validationOptions
  _formElement

  _inputElements
  _errorElements
  _buttonElement

  constructor(validationOptions, formElement) {
    this._validationOptions = validationOptions;
    this._formElement = formElement;
  }

  _setErrorMessage(inputElement, errorMessage) {
    const errorElement = this._errorElements.get(inputElement.id);
    errorElement.textContent = errorMessage;
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._validationOptions.inputErrorClass);
    this._setErrorMessage(inputElement, inputElement.validationMessage);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._validationOptions.inputErrorClass);
    this._setErrorMessage(inputElement, '');
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputElements.some(inputElement => !inputElement.validity.valid);
  }

  _disableButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._validationOptions.disabledButtonClass);
  }

  _enableButton() {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._validationOptions.disabledButtonClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _handleFormInput(event) {
    const inputElement = event.target;
    this._toggleButtonState();
    this._checkInputValidity(inputElement);
  }

  _setErrorElement(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    this._errorElements.set(inputElement.id, errorElement);
  }

  _setEventListener(inputElement) {
    inputElement.addEventListener('input', event => this._handleFormInput(event));
  }

  resetFormValidation() {
    this._inputElements.forEach(inputElement => this._hideInputError(inputElement));
    this._disableButton();
  }

  enableValidation() {
    this._inputElements = Array.from(this._formElement.querySelectorAll(this._validationOptions.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validationOptions.buttonSelector);
    this._errorElements = new Map();

    this._inputElements.forEach(inputElement => {
      this._setErrorElement(inputElement);
      this._setEventListener(inputElement);
    });
  }
}
