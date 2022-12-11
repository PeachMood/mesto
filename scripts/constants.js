export const buttonEditProfile = document.querySelector('.profile__edit');
export const buttonAddCard = document.querySelector('.profile__add');

export const cardTemplate = '#card-template';
export const cardsContainerSelector = '.cards__container';
export const profilePopupSelector = '.popup_profile';
export const cardPopupSelector = '.popup_card';
export const figurePopupSelector = '.popup_figure';
export const nameTitleSelector = '.profile__name';
export const jobTitleSelector = '.profile__job';
export const profileFormSelector = '.form_profile';
export const cardFormSelector = '.form_card';

export const initialCards = [
  { place: 'Деревня Букчон', link: './images/card-bukchon.jpg' },
  { place: 'Чхандоккун', link: './images/card-chkhandokkun.jpg' },
  { place: 'Парк Чхонгечхон', link: './images/card-chkhongechkhon.jpg' },
  { place: 'Храм Чогеса', link: './images/card-chogesa.jpg' },
  { place: 'Парк Намсан', link: './images/card-namsan.jpg' },
  { place: 'Национальный парк Пукхансан', link: './images/card-pukhansan.jpg' }
];

export const validationOptions = {
  formSelector: '.form',
  inputSelector: '.form__input',
  buttonSelector: '.form__submit',
  disabledButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
};
