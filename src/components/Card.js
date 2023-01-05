export class Card {
  constructor(data, userId, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick) {
    this._data = data;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _createCard() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card__element')
      .cloneNode(true);
  }

  _renderTrash() {
    if (!this.isOwned()) {
      this._buttonDelete.classList.add('card__delete_hidden');
    }
  }

  _renderLikes() {
    this._counterElement.textContent = this._data.likes.length;
    if (this.isLiked()) {
      this._buttonLike.classList.add('card__like_active');
    } else {
      this._buttonLike.classList.remove('card__like_active');
    }
  }

  _renderCard() {
    this._textElement.textContent = this._data.name;
    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.name;
    this._renderLikes();
    this._renderTrash();
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => this._handleDeleteClick(this));
    this._buttonLike.addEventListener('click', () => this._handleLikeClick(this));
    this._imageElement.addEventListener('click', this._handleCardClick);
  }

  isLiked() {
    return this._data.likes.some(user => user._id === this._userId);
  }

  isOwned() {
    return this._data.owner._id === this._userId;
  }

  getData() {
    return this._data;
  }

  create() {
    this._cardElement = this._createCard();
    this._imageElement = this._cardElement.querySelector('.card__image');
    this._textElement = this._cardElement.querySelector('.card__text');
    this._buttonDelete = this._cardElement.querySelector('.card__delete');
    this._buttonLike = this._cardElement.querySelector('.card__like');
    this._counterElement = this._cardElement.querySelector('.card__counter');

    this._renderCard();
    this._setEventListeners();

    return this._cardElement;
  }

  updateLikes(likes) {
    this._data.likes = likes;
    this._renderLikes();
  }

  delete() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
