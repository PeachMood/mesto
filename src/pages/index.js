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
} from '../utils/constants';

import { UserInfo } from '../components/UserInfo';
import { FormValidator } from '../components/FormValidator';
import { Card } from '../components/Card';
import { Section } from '../components/Section';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';

import './index.css';

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


const resetProfileForm = () => {
  profilePopup.reset();
  profileFormValidator.resetValidation();
};
const handleProfileFormSubmit = (event, inputValues) => {
  event.preventDefault();
  userInfo.setUserInfo(inputValues);
  profilePopup.close();
};
const profilePopup = new PopupWithForm(resetProfileForm, handleProfileFormSubmit, profilePopupSelector);
profilePopup.setEventListeners();


const resetCardForm = () => {
  cardPopup.reset();
  cardFormValidator.resetValidation();
};
const handleCardFormSubmit = (event, inputValues) => {
  event.preventDefault();
  renderCard(inputValues);
  cardPopup.close();
};
const cardPopup = new PopupWithForm(resetCardForm, handleCardFormSubmit, cardPopupSelector);
cardPopup.setEventListeners();


buttonEditProfile.addEventListener('click', () => profilePopup.open(userInfo.getUserInfo()));
buttonAddCard.addEventListener('click', () => cardPopup.open());
cardsContainer.renderItems();
