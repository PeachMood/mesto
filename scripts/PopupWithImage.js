import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector('.figure__image');
    this._textElement = this._popupElement.querySelector('.figure__text');
  }

  open({ place, link }) {
    this._textElement.textContent = place;
    this._imageElement.src = link;
    this._imageElement.alt = place;
    super.open();
  }
}
