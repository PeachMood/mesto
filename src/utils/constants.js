import cardBukchonImage from '../images/card-bukchon.jpg';
import cardChkhandokkunImage from '../images/card-chkhandokkun.jpg';
import cardChkhongechkhonImage from '../images/card-chkhongechkhon.jpg';
import cardChogesaImage from '../images/card-chogesa.jpg';
import cardNamsanImage from '../images/card-namsan.jpg'
import cardPukhansanImage from '../images/card-pukhansan.jpg';

export const initialCards = [
  { place: 'Деревня Букчон', link: cardBukchonImage },
  { place: 'Чхандоккун', link: cardChkhandokkunImage },
  { place: 'Парк Чхонгечхон', link: cardChkhongechkhonImage },
  { place: 'Храм Чогеса', link: cardChogesaImage },
  { place: 'Парк Намсан', link: cardNamsanImage },
  { place: 'Национальный парк Пукхансан', link: cardPukhansanImage }
];

export const validationOptions = {
  formSelector: '.form',
  inputSelector: '.form__input',
  buttonSelector: '.form__submit',
  disabledButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
};

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