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
const profilePopupContainer = profilePopup.querySelector('.popup__container');
const profilePopupButtonClose = profilePopup.querySelector('.popup__close');
const profileForm = profilePopup.querySelector('.form');
const nameInput = profileForm.querySelector('.form__input_name');
const jobInput = profileForm.querySelector('.form__input_job');

const cardPopup = document.querySelector('.popup_card');
const cardPopupContainer = cardPopup.querySelector('.popup__container');
const cardPopupButtonClose = cardPopup.querySelector('.popup__close');
const cardForm = cardPopup.querySelector('.form');
const placeInput = cardForm.querySelector('.form__input_place');
const linkInput = cardForm.querySelector('.form__input_link');

const figurePopup = document.querySelector('.popup_figure');
const figurePopupContainer = figurePopup.querySelector('.popup__container');
const figurePopupButtonClose = figurePopup.querySelector('.popup__close');
const figureImage = figurePopup.querySelector('.figure__image');
const figureText = figurePopup.querySelector('.figure__text');

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

function openPopup(popup) {
  popup.classList.add(POPUP_OPENED_CLASS);
}

function handleEditClick() {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;

  openPopup(profilePopup);
}

function handleAddClick() {
  cardForm.reset();

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
