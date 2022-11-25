import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { initialCards } from './cards.js';

const POPUP_HIDDEN_CLASS = 'popup_hidden';
const POPUP_OPENED_CLASS = 'popup_opened';

const validationOptions = {
  formSelector: '.form',
  inputSelector: '.form__input',
  buttonSelector: '.form__submit',
  disabledButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
};

const cardsContainer=  document.querySelector('.cards__container');

const profile = document.querySelector('.profile');
const buttonEditProfile = profile.querySelector('.profile__edit');
const buttonAddCard = profile.querySelector('.profile__add');
const nameTitle = profile.querySelector('.profile__name');
const jobTitle = profile.querySelector('.profile__job');

const profilePopup = document.querySelector('.popup_profile');
const profileForm = profilePopup.querySelector('.form');
const nameInput = profileForm.querySelector('#name-input');
const jobInput = profileForm.querySelector('#job-input');
const profileFormValidator = new FormValidator(validationOptions, profileForm);

const cardPopup = document.querySelector('.popup_card');
const cardForm = cardPopup.querySelector('.form');
const placeInput = cardForm.querySelector('#place-input');
const linkInput = cardForm.querySelector('#link-input');
const cardFormValidator = new FormValidator(validationOptions, cardForm);

const figurePopup = document.querySelector('.popup_figure');
const figureImage = figurePopup.querySelector('.figure__image');
const figureText = figurePopup.querySelector('.figure__text');

function showPopup(popup) {
  popup.classList.remove(POPUP_HIDDEN_CLASS);
}

function handleImageClick(place, link) {
  figureText.textContent = place;
  figureImage.src = link;
  figureImage.alt = place;

  openPopup(figurePopup);
}

function renderCard(data, container) {
  const card = new Card(data, '#card-template', handleImageClick);
  const cardElement = card.createElement();
  container.prepend(cardElement);
}

function loadCards() {
  initialCards.forEach(card => renderCard(card, cardsContainer));
}

function handleWindowLoad() {
  showPopup(profilePopup);
  showPopup(cardPopup);
  showPopup(figurePopup);
  profileFormValidator.enableValidation();
  cardFormValidator.enableValidation();
  loadCards();
}

function handleEscapeKeydown(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.' + POPUP_OPENED_CLASS);
    closePopup(openedPopup);
  }
}

function closePopup(popup) {
  popup.classList.remove(POPUP_OPENED_CLASS);
  document.body.removeEventListener('keydown', handleEscapeKeydown);
}

function openPopup(popup) {
  popup.classList.add(POPUP_OPENED_CLASS);
  document.body.addEventListener('keydown', handleEscapeKeydown);
}

function handleCloseClick(event) {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__close')) {
    closePopup(event.currentTarget)
  }
}

function handleEditClick() {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;

  profileFormValidator.resetValidation();

  openPopup(profilePopup);
}

function handleAddClick() {
  cardForm.reset();

  cardFormValidator.resetValidation();

  openPopup(cardPopup);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;

  closePopup(profilePopup);
}

function handleCardFormSubmit(event) {
  event.preventDefault();

  const data = {place: placeInput.value, link: linkInput.value};
  renderCard(data, cardsContainer);

  closePopup(cardPopup);
}

window.addEventListener('load', handleWindowLoad);

profilePopup.addEventListener('click', event => handleCloseClick(event));
cardPopup.addEventListener('click', event => handleCloseClick(event));
figurePopup.addEventListener('click', event => handleCloseClick(event));

buttonEditProfile.addEventListener('click', handleEditClick);
buttonAddCard.addEventListener('click', handleAddClick);

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);
