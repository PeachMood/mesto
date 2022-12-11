import {
  buttonEditProfile,
  buttonAddCard,
  cardTemplate,
  cardsContainerSelector,
  profilePopupSelector,
  cardPopupSelector,
  figurePopupSelector,
  nameTitleSelector,
  jobTitleSelector,
  initialCards,
  validationOptions,
  profileFormSelector,
  cardFormSelector
} from './constants.js';

import { UserInfo } from './UserInfo.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';


const userInfo = new UserInfo({ nameTitleSelector, jobTitleSelector });

const profileFormValidator = new FormValidator(validationOptions, profileFormSelector);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationOptions, cardFormSelector);
cardFormValidator.enableValidation();

const figurePopup = new PopupWithImage(figurePopupSelector);
figurePopup.setEventListeners();


const renderCard = (data) => {
  const card = new Card(data, cardTemplate, () => figurePopup.open(data));
  cardsContainer.addItem(card.createElement());
};
const cardsContainer = new Section({ items: initialCards, renderer: renderCard }, cardsContainerSelector);


const initProfileForm = () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  profileFormValidator.resetValidation();
};
const handleProfileFormSubmit = (event, inputValues) => {
  event.preventDefault();
  userInfo.setUserInfo(inputValues);
  profilePopup.close();
};
const profilePopup = new PopupWithForm(initProfileForm, handleProfileFormSubmit, profilePopupSelector);
profilePopup.setEventListeners();


const initCardForm = () => {
  profilePopup.resetForm();
  cardFormValidator.resetValidation();
};
const handleCardFormSubmit = (event, inputValues) => {
  event.preventDefault();
  renderCard(inputValues);
  cardPopup.close();
};
const cardPopup = new PopupWithForm(initCardForm, handleCardFormSubmit, cardPopupSelector);
cardPopup.setEventListeners();


buttonEditProfile.addEventListener('click', () => profilePopup.open());
buttonAddCard.addEventListener('click', () => cardPopup.open());
cardsContainer.renderItems();
