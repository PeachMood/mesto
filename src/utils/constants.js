// Токен был взят у другого человка, поскольку личный не удалось получить у куратора в связи с новогодними праздниками
export const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: 'cc5dda14-abf9-4f58-a45b-5d14df501467',
    'Content-Type': 'application/json'
  }
}

export const validationOptions = {
  formSelector: '.form',
  inputSelector: '.form__input',
  buttonSelector: '.form__submit',
  disabledButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
};

export const cardTemplate = '#card-template';
export const cardsContainerSelector = '.cards__container';

export const avatarPopupSelector = '.popup_avatar';
export const avatarFormSelector = '.form_avatar';

export const profilePopupSelector = '.popup_profile';
export const profileFormSelector = '.form_profile';

export const cardPopupSelector = '.popup_card';
export const cardFormSelector = '.form_card';

export const figurePopupSelector = '.popup_figure';
export const confirmPopupSelector = '.popup_confirm';

export const avatarImageSelector = '.profile__avatar';
export const nameTitleSelector = '.profile__name';
export const aboutTitleSelector = '.profile__about';

export const buttonEditProfile = document.querySelector('.profile__edit');
export const buttonAddCard = document.querySelector('.profile__add');
export const buttonEditAvatar = document.querySelector(avatarImageSelector);
