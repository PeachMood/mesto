export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.body.removeEventListener('keydown', this._handleEscClose);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.body.addEventListener('keydown', this._handleEscClose);
  }

  _handleCloseClick(event) {
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', this._handleCloseClick);
  }
}
