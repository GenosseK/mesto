import '../pages/index.css'
import Card from '../scripts/components/card.js';
import { initialCards } from '../scripts/utils/initialCards.js';
import FormValidator from '../scripts/utils/validate.js';
import Popup from '../scripts/components/popup.js';
import PopupWithForm from '../scripts/components/popupWithForm.js';
import PopupWithImage from '../scripts/components/popupWithImage.js';
import Section from '../scripts/components/section.js';
import UserInfo from '../scripts/components/userInfo.js';

/*
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupAddCard = document.querySelector('.popup_add-card')
const closeButtons = document.querySelectorAll('.popup__btn-close');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__job');
const elementsGrid = document.querySelector('.elements__grid');
const cardsTemplate = document.querySelector('.cards-template').content;
const popupImage = imageViewerPopup.querySelector('.popup__image');
const popupFigcaption = imageViewerPopup.querySelector('.popup__figcaption');
const popups = document.querySelectorAll('.popup');
const imageViewerPopup = document.querySelector('#imageViewerPopup');
*/

const buttonEdit = document.querySelector('.profile__edit-button');
const formEditProfile = document.forms.profileEdit;
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const formAddCard = document.forms.addCard;

const popupWithImage = new PopupWithImage('#imageViewerPopup')

const userInfo = new UserInfo({
  userNameElement: '.profile__name',
  userInfoElement: '.profile__job'
})

// Создание карточки
const createCard = (item) => {
  const cardElement = new Card(item, '.cards-template', () => {
    popupWithImage.open(item)
  });
  return cardElement.createCard();
};

const cardContainer = new Section({
  renderer: (card) => {
    cardContainer.addItem(createCard(card));
  }, 
},'.elements__grid')

cardContainer.renderItems(initialCards);

// Popup редактирования профиля
const formProfile = new PopupWithForm('.popup_profile-edit', {
  handleFormSubmit: ({ userName, userDescription }) => {
    userInfo.setUserInfo({ userName, userDescription })
  }
})

buttonEdit.addEventListener('click', () => {
  formProfile.open()

  formProfile.showInputValues(userInfo.getUserInfo())
  editProfileFormValidator.resetValidation();
})


// Popup добавления карточки
const addCardPopup = new PopupWithForm('.popup_add-card', {
  handleFormSubmit: ({ title, url }) => {
    cardContainer.addItem(createCard({
      name: title,
      link: url,
      alt: title
    }))
  }
});

buttonOpenAddCardPopup.addEventListener('click', () => {
  addCardPopup.open()

  addCardFormValidator.resetValidation();
})

// Валидация
const validationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorCLassSelector: 'popup__input-error',
  errorClass: 'popup__input-error_visible'
};

const editProfileFormValidator = new FormValidator(formEditProfile, validationOptions);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(formAddCard, validationOptions);
addCardFormValidator.enableValidation();

popupWithImage.setEventListeners()
formProfile.setEventListeners()
addCardPopup.setEventListeners()