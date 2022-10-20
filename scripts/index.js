const POPUP_OPENED_CLASS = 'popup_opened';

const editProfileButton = document.querySelector('.profile__edit');
const popupElement = document.querySelector('.popup');
const popupContainer = popupElement.querySelector('.popup__container');
const closePopupButton = popupElement.querySelector('.popup__close');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

const profileElement = document.querySelector('.profile');
const nameTitle = profileElement.querySelector('.profile__name');
const jobTitle = profileElement.querySelector('.profile__job');

function editProfileHandler() {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;
  popupElement.classList.add(POPUP_OPENED_CLASS);
}

function closePopupHandler(event) {
  if (!popupContainer.contains(event.target) || event.target === closePopupButton) {
    popupElement.classList.remove(POPUP_OPENED_CLASS);
  }
}

function formSubmitHandler(event) {
  event.preventDefault();

  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;

  popupElement.classList.remove(POPUP_OPENED_CLASS);
}

editProfileButton.addEventListener('click', editProfileHandler);
popupElement.addEventListener('click', closePopupHandler);
formElement.addEventListener('submit', formSubmitHandler);
