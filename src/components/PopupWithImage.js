import { Popup } from './Popup';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector('.figure__image');
    this._textElement = this._popupElement.querySelector('.figure__text');
  }

  open({ name, link }) {
    this._textElement.textContent = name;
    this._imageElement.src = link;
    this._imageElement.alt = name;
    super.open();
  }
}
