export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscapeKeydown = this._handleEscapeKeydown.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleWindowLoad = this._handleWindowLoad.bind(this);
  }

  _handleEscapeKeydown(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.body.removeEventListener('keydown', this._handleEscapeKeydown);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.body.addEventListener('keydown', this._handleEscapeKeydown);
  }

  show() {
    this._popupElement.classList.remove('popup_hidden');
  }

  _handleCloseClick(event) {
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  // Предотвращает преждевременное появление попапа при загрузке страницы
  _handleWindowLoad() {
    this.show();
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', this._handleCloseClick);
    window.addEventListener('load', this._handleWindowLoad);
  }
}
