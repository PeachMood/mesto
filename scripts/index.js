const POPUP_HIDDEN_CLASS = 'popup_hidden';
const POPUP_OPENED_CLASS = 'popup_opened';
const LIKE_BUTTON_ACTIVE_CLASS = 'card__like_active';

const cardsContainer=  document.querySelector('.cards__container');
const cardTemplate = document.querySelector('#card-template').content;

const profile = document.querySelector('.profile');
const editProfileButton = profile.querySelector('.profile__edit');
const addCardButton = profile.querySelector('.profile__add');
const nameTitle = profile.querySelector('.profile__name');
const jobTitle = profile.querySelector('.profile__job');

const profilePopup = document.querySelector('.popup_profile');
const profileForm = profilePopup.querySelector('.form');
const nameInput = profileForm.querySelector('.form__input_name');
const jobInput = profileForm.querySelector('.form__input_job');

const cardPopup = document.querySelector('.popup_card');
const cardForm = cardPopup.querySelector('.form');
const placeInput = cardForm.querySelector('.form__input_place');
const linkInput = cardForm.querySelector('.form__input_link');

const figurePopup = document.querySelector('.popup_figure');
const figureImage = figurePopup.querySelector('.figure__image');
const figureText = figurePopup.querySelector('.figure__text');

const initialCards = [
  {place: 'Деревня Букчон', link: './images/card-bukchon.jpg'},
  {place: 'Чхандоккун', link: './images/card-chkhandokkun.jpg'},
  {place: 'Парк Чхонгечхон', link: './images/card-chkhongechkhon.jpg'},
  {place: 'Храм Чогеса', link: './images/card-chogesa.jpg'},
  {place: 'Парк Намсан', link: './images/card-namsan.jpg'},
  {place: 'Национальный парк Пукхансан', link: './images/card-pukhansan.jpg'}
];

//Предотвращает преждевременное отображение попапов
function showPopup(popup) {
  popup.classList.remove(POPUP_HIDDEN_CLASS);
}

function loadCards() {
  initialCards.forEach(card => renderCard(card, cardsContainer));
}

function loadPage() {
  showPopup(profilePopup);
  showPopup(cardPopup);
  showPopup(figurePopup);
  loadCards();
}

function openPopup(popup) {
  popup.classList.add(POPUP_OPENED_CLASS);
}

function closePopup(event, popup) {
  const popupContainer = popup.querySelector('.popup__container');
  const closePopupButton = popup.querySelector('.popup__close');

  if (!popupContainer.contains(event.target) || event.target === closePopupButton || event.type === 'submit') {
    popup.classList.remove(POPUP_OPENED_CLASS);
  }
}

function openProfilePopup() {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;

  openPopup(profilePopup);
}

function openCardPopup() {
  placeInput.value = '';
  linkInput.value = '';

  openPopup(cardPopup);
}

function openFigurePopup(event) {
  const cardImage = event.target;
  const cardElement = cardImage.closest('.card__element');
  const cardText = cardElement.querySelector('.card__text');

  figureImage.src = cardImage.src;
  figureImage.alt = cardImage.alt;
  figureText.textContent = cardText.textContent;

  openPopup(figurePopup);
}

function deleteCard(event) {
  const cardElement = event.target.closest('.card__element');
  cardElement.remove();
}

function likeCard(event) {
  event.target.classList.toggle(LIKE_BUTTON_ACTIVE_CLASS);
}

function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete');
  const cardImage = cardElement.querySelector('.card__image');
  const cardText = cardElement.querySelector('.card__text');
  const cardLikeButton = cardElement.querySelector('.card__like');

  cardDeleteButton.addEventListener('click', deleteCard);
  cardImage.src = card.link;
  cardImage.alt = card.place;
  cardImage.addEventListener('click', openFigurePopup);
  cardText.textContent = card.place;
  cardLikeButton.addEventListener('click', likeCard);

  return cardElement;
}

function renderCard(card, container) {
  const cardElement = createCard(card);
  container.prepend(cardElement);
}

function editProfile(event) {
  event.preventDefault();

  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;

  closePopup(event, profilePopup);
}

function addCard(event) {
  event.preventDefault();

  const card = {place: placeInput.value, link: linkInput.value};
  renderCard(card, cardsContainer);

  closePopup(event, cardPopup);
}

window.addEventListener('load', loadPage);

profilePopup.addEventListener('click', event => closePopup(event, profilePopup));
cardPopup.addEventListener('click', event => closePopup(event, cardPopup));
figurePopup.addEventListener('click', event => closePopup(event, figurePopup));

editProfileButton.addEventListener('click', openProfilePopup);
addCardButton.addEventListener('click', openCardPopup);

profileForm.addEventListener('submit', editProfile);
cardForm.addEventListener('submit', addCard);
