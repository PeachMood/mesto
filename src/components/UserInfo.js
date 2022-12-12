export class UserInfo {
  constructor({ nameTitleSelector, jobTitleSelector }) {
    this._nameTitle = document.querySelector(nameTitleSelector);
    this._jobTitle = document.querySelector(jobTitleSelector);
  }

  getUserInfo() {
    return {
      name: this._nameTitle.textContent,
      job: this._jobTitle.textContent
    };
  }

  setUserInfo({ name, job }) {
    this._nameTitle.textContent = name;
    this._jobTitle.textContent = job;
  }
}
