function setErrorMessage(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
}

function showInputError(formElement, inputElement, inputErrorClass) {
  inputElement.classList.add(inputErrorClass);
  setErrorMessage(formElement, inputElement, inputElement.validationMessage);
}

function hideInputError(formElement, inputElement, inputErrorClass) {
  inputElement.classList.remove(inputErrorClass);
  setErrorMessage(formElement, inputElement, '');
}

function checkInputValidity(formElement, inputElement, inputErrorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass);
  }
}

function hasInvalidInput(inputElements) {
  return inputElements.some(inputElement => !inputElement.validity.valid);
}

function disableButton(buttonElement, disabledButtonClass) {
  buttonElement.disabled = true;
  buttonElement.classList.add(disabledButtonClass);
}

function enableButton(buttonElement, disabledButtonClass) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(disabledButtonClass)
}

function toggleButtonState(inputElements, buttonElement, disabledButtonClass) {
  if (hasInvalidInput(inputElements)) {
    disableButton(buttonElement, disabledButtonClass)
  } else {
    enableButton(buttonElement, disabledButtonClass)
  }
}

function resetFormValidation(formElement, inputElements, inputErrorClass, buttonElement, disabledButtonClass) {
  inputElements.forEach(inputElement => hideInputError(formElement, inputElement, inputErrorClass));
  disableButton(buttonElement, disabledButtonClass);
}

function handleFormInput(event, formElement, inputElements, inputErrorClass, buttonElement, disabledButtonClass) {
  const inputElement = event.target;
  toggleButtonState(inputElements, buttonElement, disabledButtonClass);
  checkInputValidity(formElement, inputElement, inputErrorClass);
}

function setEventListeners(formElement, inputSelector, inputErrorClass, buttonSelector, disabledButtonClass) {
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(buttonSelector);

  inputElements.forEach(inputElement => inputElement.addEventListener('input',
      event => handleFormInput(event, formElement, inputElements, inputErrorClass, buttonElement, disabledButtonClass))
  );
}

function enableValidation({formSelector, inputSelector, buttonSelector, disabledButtonClass, inputErrorClass}) {
  const formElements = Array.from(document.querySelectorAll(formSelector));
  formElements.forEach(formElement => setEventListeners(formElement, inputSelector, inputErrorClass, buttonSelector, disabledButtonClass));
}
