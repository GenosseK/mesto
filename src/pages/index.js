import '../pages/index.css'
import Card from '../scripts/components/Card.js';
import { initialCards } from '../scripts/utils/utils.js';
import { validationOptions, buttonEdit, formEditProfile, buttonOpenAddCardPopup, formAddCard } from '../scripts/utils/constants.js'
import FormValidator from '../scripts/components/FormValidator.js';
import Popup from '../scripts/components/Popup.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo';

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
}, '.elements__grid')

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

const editProfileFormValidator = new FormValidator(formEditProfile, validationOptions);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(formAddCard, validationOptions);
addCardFormValidator.enableValidation();

popupWithImage.setEventListeners()
formProfile.setEventListeners()
addCardPopup.setEventListeners()


// экспериментирую с scrollButton, удалю или закомментирую по требованию
let prevScrollpos = window.pageYOffset;
let scrollButton = document.getElementById('scroll-to-top-button');
let showTimer = null;
let hideTimer = null;

window.addEventListener('scroll', function () {
  let currentScrollpos = window.pageYOffset;
  if (prevScrollpos > currentScrollpos && currentScrollpos > 0) {
    cancelHide();
    scheduleShow();
  } else {
    cancelShow();
    scheduleHide();
  }
  prevScrollpos = currentScrollpos;
});

function scheduleShow() {
  if (!showTimer) {
    showTimer = window.requestAnimationFrame(showButton);
  }
}

function scheduleHide() {
  if (!hideTimer) {
    hideTimer = window.requestAnimationFrame(hideButton);
  }
}

function cancelShow() {
  if (showTimer) {
    window.cancelAnimationFrame(showTimer);
    showTimer = null;
  }
}

function cancelHide() {
  if (hideTimer) {
    window.cancelAnimationFrame(hideTimer);
    hideTimer = null;
  }
}

function showButton() {
  scrollButton.classList.remove('slide-out');
  scrollButton.style.display = 'block';
  showTimer = null;
}

function hideButton() {
  scrollButton.classList.add('slide-out');
  hideTimer = null;
}

document.getElementById('scroll-to-top-button').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});