import '../pages/index.css'
import API from '../scripts/components/API.js'
import Card from '../scripts/components/Card.js';
import { validationOptions, buttonEdit, formEditProfile, buttonOpenAddCardPopup, formAddCard, formChangeAvatar, avatarButton } from '../scripts/utils/constants.js'
import FormValidator from '../scripts/components/FormValidator.js';
import Popup from '../scripts/components/Popup.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
const popupWithImage = new PopupWithImage('#imageViewerPopup')

const api = new API({
  baseURL: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '2bc76956-8c18-424e-a75e-aff99086882b',
    'Content-Type': 'application/json'
  }
})

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userId = data._id;
    userInfo.setUserInfo({
      userName: data.name,
      userDescription: data.about,
      userAvatar: data.avatar
    }),
      cardContainer.renderItems(cards);
  })
  .catch((err) => console.log(err))

const userInfo = new UserInfo({
  userNameElement: '.profile__name',
  userInfoElement: '.profile__job',
  userAvatar: '.profile__avatar'
})

// Popup изменения аватара

const avatarPopup = new PopupWithForm('.popup_update-avatar', {
  handleFormSubmit: (data) => {
    avatarPopup.renderLoading(true);
    api.changeAvatar(data)
      .then((res) => {
        userInfo.setUserInfo({
          userName: res.name,
          userDescription: res.about,
          userAvatar: res.avatar
        });
        avatarPopup.close();
      })
      .finally(() => {
        avatarPopup.renderLoading(false);
      });
  },
});

avatarButton.addEventListener('click', () => {
  avatarPopup.open();

  changeAvatarFormValidator.resetValidation()
});

const confirmPopup = new PopupWithConfirmation('.popup_delete-card');

const cardContainer = new Section({
  renderer: (card) => {
    cardContainer.addItem(createCard(card));
  },
}, '.elements__grid')

// Создание карточки
const createCard = (data) => {
  const cardElement = new Card(data,
    '.cards-template',
    () => popupWithImage.open(data),
    (id) => {
      confirmPopup.setConfirm(() => {
        confirmPopup.renderLoading(true)
        api.deleteCard(id)
          .then(() => {
            cardElement.deleteCard();
            confirmPopup.close();
          })
          .catch((err) => console.log((err)))
          .finally(() => confirmPopup.renderLoading(false))
      })
      confirmPopup.open()
    },
    (id) => {
      if (!cardElement.isLiked()) {
        api.addLike(id)
          .then((data) => {
            cardElement.updateData(data);
            cardElement.updateLikesStatus();
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        api.deleteLike(id)
          .then((data) => {
            cardElement.updateData(data);
            cardElement.updateLikesStatus();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    userId
  );
  return cardElement.createCard();
};

// Popup добавления карточки

const addCardPopup = new PopupWithForm('.popup_add-card', {
  handleFormSubmit: ({ title, url }) => {
    addCardPopup.renderLoading(true)
    api.addCard({ name: title, link: url })
      .then((card) => {
        cardContainer.addItem(createCard(card));
        addCardPopup.close();
      })
      .catch(error => console.log(error))
      .finally(() => addCardPopup.renderLoading(false))
  }
});

buttonOpenAddCardPopup.addEventListener('click', () => {
  addCardPopup.open()

  addCardFormValidator.resetValidation();
})

// Popup редактирования профиля

const formProfile = new PopupWithForm('.popup_profile-edit', {
  handleFormSubmit: ({ userName, userDescription }) => {
    formProfile.renderLoading(true)
    api.editUserInfo({ name: userName, about: userDescription })
      .then(data => {
        userInfo.setUserInfo({
          userName: data.name,
          userDescription: data.about,
          userAvatar: data.avatar
        });
        formProfile.close();
      })
      .catch(error => console.log(error))
      .finally(() => formProfile.renderLoading(false))
  }
});

buttonEdit.addEventListener('click', () => {
  formProfile.open()

  formProfile.showInputValues(userInfo.getUserInfo())
  editProfileFormValidator.resetValidation();
})


const editProfileFormValidator = new FormValidator(formEditProfile, validationOptions);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(formAddCard, validationOptions);
addCardFormValidator.enableValidation();

const changeAvatarFormValidator = new FormValidator(formChangeAvatar, validationOptions);
changeAvatarFormValidator.enableValidation();

popupWithImage.setEventListeners()
formProfile.setEventListeners()
addCardPopup.setEventListeners()
confirmPopup.setEventListeners()
avatarPopup.setEventListeners()


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