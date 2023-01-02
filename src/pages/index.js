import {
  buttonEditProfile,
  buttonAddCard,
  cardTemplate,
  cardsContainerSelector,
  profilePopupSelector,
  cardPopupSelector,
  figurePopupSelector,
  nameTitleSelector,
  aboutTitleSelector,
  initialCards,
  validationOptions,
  profileFormSelector,
  cardFormSelector, apiOptions
} from '../utils/constants';

import { Api } from "../components/Api";
import { UserInfo } from '../components/UserInfo';
import { FormValidator } from '../components/FormValidator';
import { Card } from '../components/Card';
import { Section } from '../components/Section';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';

import './index.css';

const api = new Api(apiOptions);

const userInfo = new UserInfo({ nameTitleSelector, aboutTitleSelector });

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


const handleProfileFormSubmit = (inputValues) => {
  userInfo.setUserInfo(inputValues);
  profilePopup.close();
};
const profilePopup = new PopupWithForm(profilePopupSelector, handleProfileFormSubmit, () => profileFormValidator.resetValidation());
profilePopup.setEventListeners();


const handleCardFormSubmit = (inputValues) => {
  renderCard(inputValues);
  cardPopup.close();
};
const cardPopup = new PopupWithForm(cardPopupSelector, handleCardFormSubmit, () => cardFormValidator.resetValidation());
cardPopup.setEventListeners();


buttonEditProfile.addEventListener('click', () => profilePopup.open(userInfo.getUserInfo()));
buttonAddCard.addEventListener('click', () => cardPopup.open());
cardsContainer.renderItems();
