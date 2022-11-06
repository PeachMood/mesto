const POPUP_HIDDEN_CLASS = 'popup_hidden';
const POPUP_OPENED_CLASS = 'popup_opened';
const LIKE_BUTTON_ACTIVE_CLASS = 'card__like_active';

const cardsContainer=  document.querySelector('.cards__container');
const cardTemplate = document.querySelector('#card-template').content;

const profile = document.querySelector('.profile');
const buttonEditProfile = profile.querySelector('.profile__edit');
const buttonAddCard = profile.querySelector('.profile__add');
const nameTitle = profile.querySelector('.profile__name');
const jobTitle = profile.querySelector('.profile__job');

const profilePopup = document.querySelector('.popup_profile');
const profileForm = profilePopup.querySelector('.form');
const nameInput = profileForm.querySelector('#name-input');
const jobInput = profileForm.querySelector('#job-input');
const profileSubmitButton = profileForm.querySelector('.form__submit');

const cardPopup = document.querySelector('.popup_card');
const cardForm = cardPopup.querySelector('.form');
const placeInput = cardForm.querySelector('#place-input');
const linkInput = cardForm.querySelector('#link-input');
const cardSubmitButton = cardForm.querySelector('.form__submit');

const figurePopup = document.querySelector('.popup_figure');
const figureImage = figurePopup.querySelector('.figure__image');
const figureText = figurePopup.querySelector('.figure__text');

const validationOptions = {
  formSelector: '.form',
  inputSelector: '.form__input',
  buttonSelector: '.form__submit',
  disabledButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
};

// Предотвращает преждевременное отображение попапов
function showPopup(popup) {
  popup.classList.remove(POPUP_HIDDEN_CLASS);
}

function loadCards() {
  initialCards.forEach(card => renderCard(card, cardsContainer));
}

function handleWindowLoad() {
  showPopup(profilePopup);
  showPopup(cardPopup);
  showPopup(figurePopup);
  enableValidation(validationOptions);
  loadCards();
}

function closePopup(popup) {
  popup.classList.remove(POPUP_OPENED_CLASS);
}

function handleCloseClick(event) {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__close')) {
    closePopup(event.currentTarget)
  }
}

function setEscapeKeydownHandler(popup) {
  const handleEscapeKeydown = event => {
    if (event.key === 'Escape') {
      document.body.removeEventListener('keydown', handleEscapeKeydown);
      closePopup(popup);
    }
  }
  document.body.addEventListener('keydown', handleEscapeKeydown);
}

function openPopup(popup) {
  popup.classList.add(POPUP_OPENED_CLASS);
}

function handleEditClick() {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;

  const profileFormInputElements = [nameInput, jobInput];
  resetFormValidation(profileForm, profileFormInputElements, validationOptions.inputErrorClass, profileSubmitButton, validationOptions.disabledButtonClass);

  setEscapeKeydownHandler(profilePopup);
  openPopup(profilePopup);
}

function handleAddClick() {
  cardForm.reset();

  const cardFormInputElements = [placeInput, linkInput];
  resetFormValidation(cardForm, cardFormInputElements, validationOptions.inputErrorClass, cardSubmitButton, validationOptions.disabledButtonClass);

  setEscapeKeydownHandler(cardPopup);
  openPopup(cardPopup);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;

  closePopup(profilePopup);
}

function handleDeleteClick(event) {
  const cardElement = event.target.closest('.card__element');
  cardElement.remove();
}

function handleImageClick(event) {
  const cardImage = event.target;
  const cardElement = cardImage.closest('.card__element');
  const cardText = cardElement.querySelector('.card__text');

  figureImage.src = cardImage.src;
  figureImage.alt = cardImage.alt;
  figureText.textContent = cardText.textContent;

  setEscapeKeydownHandler(figurePopup);
  openPopup(figurePopup);
}

function handleLikeClick(event) {
  event.target.classList.toggle(LIKE_BUTTON_ACTIVE_CLASS);
}

function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete');
  const cardImage = cardElement.querySelector('.card__image');
  const cardText = cardElement.querySelector('.card__text');
  const cardLikeButton = cardElement.querySelector('.card__like');

  cardDeleteButton.addEventListener('click', handleDeleteClick);
  cardImage.src = card.link;
  cardImage.alt = card.place;
  cardImage.addEventListener('click', handleImageClick);
  cardText.textContent = card.place;
  cardLikeButton.addEventListener('click', handleLikeClick);

  return cardElement;
}

function renderCard(card, container) {
  const cardElement = createCard(card);
  container.prepend(cardElement);
}

function handleCardFormSubmit(event) {
  event.preventDefault();

  const card = {place: placeInput.value, link: linkInput.value};
  renderCard(card, cardsContainer);

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
