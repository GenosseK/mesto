import Card from './card.js';
import { initialCards } from './initialCards.js';
import FormValidator from './validate.js';
import Popup from './components/popup.js';
import PopupWithForm from './components/popupWithForm.js';
import PopupWithImage from './components/popupWithImage.js';
import Section from './components/section.js';
import UserInfo from './components/userInfo.js';

const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupAddCard = document.querySelector('.popup_add-card')
const closeButtons = document.querySelectorAll('.popup__btn-close');
const buttonEdit = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__job');
const formEditProfile = document.forms.profileEdit;
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const elementsGrid = document.querySelector('.elements__grid');
const cardsTemplate = document.querySelector('.cards-template').content;
const formAddCard = document.forms.addCard;
const imageViewerPopup = document.querySelector('#imageViewerPopup');
const popupImage = imageViewerPopup.querySelector('.popup__image');
const popupFigcaption = imageViewerPopup.querySelector('.popup__figcaption');
const popups = document.querySelectorAll('.popup');

const popupWithImage = new PopupWithImage('#imageViewerPopup')

const userInfo = new UserInfo({
  userNameElement: '.profile__name',
  userInfoElement: '.profile__job'
})


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

const formProfile = new PopupWithForm('.popup_profile-edit', {
  handleFormSubmit: (element) => {
    userInfo.setUserInfo(element)
  }
})

buttonEdit.addEventListener('click', () => {
  formProfile.open()

  formProfile.showInputValues(userInfo.getUserInfo())
  editProfileFormValidator.resetValidation();
})

const addCardPopup = new PopupWithForm('.popup_add-card', {
  handleFormSubmit: ({ name, link }) => {
    cardContainer.addItem(createCard({
      name: name,
      link: link,
      alt: name
    }))
  }
})


buttonOpenAddCardPopup.addEventListener('click', () => {
  addCardPopup.open()

  addCardFormValidator.resetValidation();
})

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

// функция закрытия popup по клику на крестик
/*
function closePopupByCrossButton(buttonClose) {
  const popupToClose = buttonClose.closest('.popup');
  closePopup(popupToClose);
}

closeButtons.forEach((button) => {
  button.addEventListener('click', () => closePopupByCrossButton(button));
});

// функция закрытия popup по нажатию ESC

function closePopupByEscapeKey(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// функция закрытия popup по клику на overlay

function closePopupByOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

popups.forEach(function (popup) {
  popup.addEventListener('mousedown', closePopupByOverlayClick);
});*/

// функция открытия popup
/*
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscapeKey);
}*/

// функция закрытия popup
/*
function closePopup(popupToClose) {
  popupToClose.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscapeKey);
}*/

// функция редактирования профиля
/*
function openEditProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  editProfileFormValidator.resetValidation();

  openPopup(popupProfileEdit);
}

buttonEdit.addEventListener('click', openEditProfileForm);

// функция открытия popup добавления карточки

buttonOpenAddCardPopup.addEventListener("click", function () {
  addCardFormValidator.resetValidation();
  openPopup(popupAddCard);
});*/

// функция возврата карточки со слушателями
/*
function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupFigcaption.textContent = name;
  openPopup(imageViewerPopup);
}*/


/*
function createCard(item) {
  const cardElement = new Card(item, '.cards-template', openPopup, handleCardClick).createCard();
  return cardElement;
}*/


// функция добавления карточек из массива
/*
initialCards.forEach(card => {
  elementsGrid.prepend(createCard(card));
});*/

// функция submit редактирования профиля
/*
function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfileEdit);
}

formEditProfile.addEventListener('submit', submitEditProfileForm);
*/
// функция добавления карточки через popup
/*
function submitCardForm(event) {
  event.preventDefault();
  const title = formAddCard.elements.title.value;
  const url = formAddCard.elements.url.value;
  const card = {
    name: title,
    link: url
  };
  elementsGrid.prepend(createCard(card));
  closePopup(popupAddCard);
  formAddCard.reset();

  addCardFormValidator.toggleButtonState(formAddCard.checkValidity());
}

formAddCard.addEventListener('submit', submitCardForm);
*/