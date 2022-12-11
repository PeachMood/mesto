export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleLikeClick = this._handleLikeClick.bind(this);
  }

  _createCard() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card__element')
      .cloneNode(true);
  }

  _setContent() {
    this._textElement.textContent = this._data.place;
    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.place;
  }

  _handleDeleteClick() {
    this._cardElement.remove();
  }

  _handleLikeClick() {
    this._buttonLike.classList.toggle('card__like_active');
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener('click', this._handleDeleteClick);
    this._buttonLike.addEventListener('click', this._handleLikeClick);
    this._imageElement.addEventListener('click', this._handleCardClick);
  }

  createElement() {
    this._cardElement = this._createCard();
    this._imageElement = this._cardElement.querySelector('.card__image');
    this._textElement = this._cardElement.querySelector('.card__text');
    this._buttonDelete = this._cardElement.querySelector('.card__delete');
    this._buttonLike = this._cardElement.querySelector('.card__like');

    this._setContent();
    this._setEventListeners();

    return this._cardElement;
  }
}
