import { Popup } from './Popup';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.form');
  }

  setConfirmHandler(handleConfirmClick) {
    this._handleConfirmClick = handleConfirmClick;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', event => {
      event.preventDefault();
      this._handleConfirmClick();
    });
  }
}
