export class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _createCard() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card__element')
      .cloneNode(true);
  }

  _setContent() {
    this._text.textContent = this._data.place;
    this._image.src = this._data.link;
    this._image.alt = this._data.place;
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleLikeClick () {
    this._buttonLike.classList.toggle('card__like_active');
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => this._handleDeleteClick());
    this._buttonLike.addEventListener('click', () => this._handleLikeClick());
    this._image.addEventListener('click', () => this._handleImageClick(this._data.place, this._data.link));
  }

  createElement() {
    this._element = this._createCard();
    this._image = this._element.querySelector('.card__image');
    this._text = this._element.querySelector('.card__text');
    this._buttonDelete = this._element.querySelector('.card__delete');
    this._buttonLike = this._element.querySelector('.card__like');

    this._setContent();
    this._setEventListeners();

    return this._element;
  }
}
