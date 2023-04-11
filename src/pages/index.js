import '../pages/index.css'
import Card from '../scripts/components/Card.js';
import { initialCards } from '../scripts/utils/utils.js';
import { validationOptions, buttonEdit, formEditProfile, buttonOpenAddCardPopup, formAddCard } from '../scripts/utils/constants.js'
import FormValidator from '../scripts/components/FormValidator.js';
import Popup from '../scripts/components/Popup.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

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

const editProfileFormValidator = new FormValidator(formEditProfile, validationOptions);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(formAddCard, validationOptions);
addCardFormValidator.enableValidation();

popupWithImage.setEventListeners()
formProfile.setEventListeners()
addCardPopup.setEventListeners()