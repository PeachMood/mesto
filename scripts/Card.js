export class Card {
  _data
  _template
  _handleImageClick

  _element
  _image
  _text
  _buttonLike
  _buttonDelete

  constructor(data, templateSelector, handleImageClick) {
    this._data = data;
    this._setTemplate(templateSelector);
    this._handleImageClick = handleImageClick;
  }

  _setTemplate(templateSelector) {
    this._template = document.querySelector(templateSelector).content;
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
    this._image.addEventListener('click', () => this._handleImageClick(this._text.textContent, this._image.src));
  }

  createElement() {
    this._element = this._template.cloneNode(true).querySelector('.card__element');
    this._image = this._element.querySelector('.card__image');
    this._text = this._element.querySelector('.card__text');
    this._buttonDelete = this._element.querySelector('.card__delete');
    this._buttonLike = this._element.querySelector('.card__like');

    this._setContent();
    this._setEventListeners();

    return this._element;
  }
}
