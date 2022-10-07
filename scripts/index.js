const POPUP_OPENED_CLASS = 'popup_opened';

const editProfileButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupContainer = popupElement.querySelector('.popup__container');
const closePopupButton = popupElement.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

function editProfileHandler() {
  popupElement.classList.add(POPUP_OPENED_CLASS);
}

function closePopupHandler(event) {
  if (!popupContainer.contains(event.target) || event.target === closePopupButton) {
    popupElement.classList.remove(POPUP_OPENED_CLASS);
  }
}

function formSubmitHandler(event) {
  event.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  const profileElement = document.querySelector('.profile');
  const nameTitle = profileElement.querySelector('.profile__name');
  const jobTitle = profileElement.querySelector('.profile__job');

  nameTitle.textContent = name;
  jobTitle.textContent = job;

  popupElement.classList.remove(POPUP_OPENED_CLASS);
}

editProfileButton.addEventListener('click', editProfileHandler);
popupElement.addEventListener('click', closePopupHandler);
formElement.addEventListener('submit', formSubmitHandler);
