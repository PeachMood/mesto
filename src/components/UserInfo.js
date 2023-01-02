export class UserInfo {
  constructor({ nameTitleSelector, aboutTitleSelector }) {
    this._nameTitle = document.querySelector(nameTitleSelector);
    this._aboutTitle = document.querySelector(aboutTitleSelector);
  }

  getUserInfo() {
    return {
      name: this._nameTitle.textContent,
      about: this._aboutTitle.textContent
    };
  }

  setUserInfo({ name, about }) {
    this._nameTitle.textContent = name;
    this._aboutTitle.textContent = about;
  }
}
