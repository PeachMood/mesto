export class UserInfo {
  constructor({ avatarImageSelector, nameTitleSelector, aboutTitleSelector }) {
    this._data = {};
    this._avatarImage = document.querySelector(avatarImageSelector);
    this._nameTitle = document.querySelector(nameTitleSelector);
    this._aboutTitle = document.querySelector(aboutTitleSelector);
  }

  getUserInfo() {
    return this._data;
  }

  setUserId({ _id }) {
    this._data._id = _id;
  }

  setUserAvatar({ avatar }) {
    this._data.avatar = avatar;
    this._avatarImage.style.backgroundImage = `url(${this._data.avatar})`;
  }

  setUserInfo({ name, about }) {
    this._data = { ...this._data, name, about };
    this._nameTitle.textContent = this._data.name;
    this._aboutTitle.textContent = this._data.about;
  }
}
