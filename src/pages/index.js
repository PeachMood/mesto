import {
  apiOptions,
  validationOptions,
  cardTemplate,
  cardsContainerSelector,
  avatarPopupSelector,
  avatarFormSelector,
  profilePopupSelector,
  profileFormSelector,
  cardPopupSelector,
  cardFormSelector,
  figurePopupSelector,
  confirmPopupSelector,
  avatarImageSelector,
  nameTitleSelector,
  aboutTitleSelector,
  buttonEditProfile,
  buttonAddCard,
  buttonEditAvatar,
} from '../utils/constants';

import { Api } from "../components/Api";
import { UserInfo } from '../components/UserInfo';
import { FormValidator } from '../components/FormValidator';
import { Card } from '../components/Card';
import { Section } from '../components/Section';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';

import './index.css';

// Вспомогательные функции и хендлеры
const handleLikeClick = (card) => {
  const cardId = card.getData()._id;
  const response = card.isLiked() ? api.deleteLike(cardId) : api.addLike(cardId);
  response
    .then(data => card.updateLikes(data.likes))
    .catch(error => console.log(error));
};

const handleDeleteClick = (card) => {
  const handleConfirmClick = () => {
    const cardId = card.getData()._id;
    api.deleteCard(cardId)
      .then(() => {
        card.delete();
        confirmPopup.close();
      })
      .catch(error => console.log(error));
  };
  confirmPopup.setConfirmHandler(handleConfirmClick);
  confirmPopup.open();
}

const createCard = (data) => {
  const info = userInfo.getUserInfo();
  return new Card(data, info._id, cardTemplate, () => figurePopup.open(data), handleLikeClick, handleDeleteClick);
};

/* Функция renderCard отвечает только за создание DOM-елемента карточки
Логика добавления элемента в контейнер теперь инкапсулирована в классе Section и не зависит от внешних функций */
const renderCard = (data) => {
  const card = createCard(data);
  return card.create();
};

const handleAvatarFormSubmit = (inputValues) => {
  avatarPopup.setButtonText('Сохранение...');
  api.editUserAvatar(inputValues)
    .then(info => {
      userInfo.setUserAvatar(info);
      avatarPopup.close();
    })
    .catch(error => console.log(error))
    .finally(() => avatarPopup.setButtonText('Сохранить'));
};

const handleProfileFormSubmit = (inputValues) => {
  profilePopup.setButtonText('Сохранение...');
  api.editUserInfo(inputValues)
    .then(info => {
      userInfo.setUserInfo(info);
      profilePopup.close();
    })
    .catch(error => console.log(error))
    .finally(() => profilePopup.setButtonText('Сохранить'));
};

const handleCardFormSubmit = (inputValues) => {
  cardPopup.setButtonText('Создание...');
  api.addCard(inputValues)
    .then(card => {
      cardsContainer.addItem(card);
      cardPopup.close();
    })
    .catch(error => console.log(error))
    .finally(() => cardPopup.setButtonText('Создать'));
};

const handleEditAvatarClick = () => {
  const info = userInfo.getUserInfo();
  avatarPopup.open({ avatar: info.avatar });
};

const handleEditProfileClick = () => {
  const info = userInfo.getUserInfo();
  profilePopup.open({ name: info.name, about: info.about });
};

// Получаем данные о пользователе и карточки с сервера
const cardsContainer = new Section(cardsContainerSelector, renderCard);
const userInfo = new UserInfo({ avatarImageSelector, nameTitleSelector, aboutTitleSelector });
const api = new Api(apiOptions);
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([info, initialCards]) => {
    userInfo.setUserId(info);
    userInfo.setUserInfo(info);
    userInfo.setUserAvatar(info);
    cardsContainer.renderItems(initialCards);
  })
  .catch(error => console.log(error));


// Устанавливаем валидацию форм
const profileFormValidator = new FormValidator(validationOptions, profileFormSelector);
const cardFormValidator = new FormValidator(validationOptions, cardFormSelector);
const avatarFormValidator = new FormValidator(validationOptions, avatarFormSelector);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();


// Инициализируем попапы
const avatarPopup = new PopupWithForm(avatarPopupSelector, handleAvatarFormSubmit, () => avatarFormValidator.resetValidation());
const profilePopup = new PopupWithForm(profilePopupSelector, handleProfileFormSubmit, () => profileFormValidator.resetValidation());
const cardPopup = new PopupWithForm(cardPopupSelector, handleCardFormSubmit, () => cardFormValidator.resetValidation());
const figurePopup = new PopupWithImage(figurePopupSelector);
const confirmPopup = new PopupWithConfirmation(confirmPopupSelector);
avatarPopup.setEventListeners();
profilePopup.setEventListeners();
figurePopup.setEventListeners();
cardPopup.setEventListeners();
confirmPopup.setEventListeners();


// Устанавливаем слушатели событий для кнопок
buttonEditAvatar.addEventListener('click', handleEditAvatarClick);
buttonEditProfile.addEventListener('click', handleEditProfileClick);
buttonAddCard.addEventListener('click', () => cardPopup.open());
