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

// функция закрытия popup по клику на крестик

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
});

// функция открытия popup

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscapeKey);
}

// функция закрытия popup

function closePopup(popupToClose) {
  popupToClose.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscapeKey);
}

// функция редактирования профиля

function openEditProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  resetValidation(formEditProfile, validationOptions);

  openPopup(popupProfileEdit);
}

buttonEdit.addEventListener('click', openEditProfileForm);

// функция открытия popup добавления карточки

buttonOpenAddCardPopup.addEventListener("click", function () {
  resetValidation(formAddCard, validationOptions);
  openPopup(popupAddCard);
});


class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector);
    const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('element__button-like_active');
  }

  _handleImageViewer() {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupFigcaption.textContent = this._name;
    openPopup(this._imageViewerPopup);
  }

  _handleDeleteButton() {
    this._cardElement.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeButton());
    this._deleteButton.addEventListener('click', () => this._handleDeleteButton());
    this._imageViewer.addEventListener('click', () => this._handleImageViewer());
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._imageElement = this._cardElement.querySelector('.element__image');
    this._captionElement = this._cardElement.querySelector('.element__caption');
    this._likeButton = this._cardElement.querySelector('.element__button-like');
    this._deleteButton = this._cardElement.querySelector('.element__button-delete');
    this._imageViewer = this._imageElement;
    this._popupImage = imageViewerPopup.querySelector('.popup__image');
    this._popupFigcaption = imageViewerPopup.querySelector('.popup__figcaption');
    this._imageViewerPopup = imageViewerPopup;

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._captionElement.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

// функция возврата карточки со слушателями
/*
function createCard(card) {
  const cardElement = cardsTemplate.querySelector('.element').cloneNode(true);
  const imageElement = cardElement.querySelector('.element__image');
  const captionElement = cardElement.querySelector('.element__caption');
  const buttonDelete = cardElement.querySelector('.element__button-delete');

  imageElement.src = card.link;
  imageElement.alt = card.name;
  captionElement.textContent = card.name;

  const buttonLike = cardElement.querySelector('.element__button-like');
  buttonLike.addEventListener('click', function () {
    buttonLike.classList.toggle('element__button-like_active');
  });

  buttonDelete.addEventListener('click', function () {
    cardElement.remove();
  });

  const imageViewer = imageElement;
  imageViewer.addEventListener('click', function () {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupFigcaption.textContent = card.name;
    openPopup(imageViewerPopup);
  });

  return cardElement;
}
*/
// функция добавления карточек из массива

initialCards.forEach(card => {
  const cardElement = new Card(card, '.cards-template').createCard();
  elementsGrid.prepend(cardElement);
});

// функция submit редактирования профиля

function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfileEdit);
}

formEditProfile.addEventListener('submit', submitEditProfileForm);

// функция добавления карточки через popup

function submitCardForm(event) {
  event.preventDefault();
  const title = formAddCard.elements.title.value;
  const url = formAddCard.elements.url.value;
  const card = {
    name: title,
    link: url
  };
  const cardElement = new Card(card, '.cards-template').createCard();
  elementsGrid.prepend(cardElement);
  closePopup(popupAddCard);
  formAddCard.reset();

  const submitButtonElement = formAddCard.querySelector(validationOptions.submitButtonSelector);
  toggleButtonState(submitButtonElement, false, validationOptions.inactiveButtonClass);
}

formAddCard.addEventListener('submit', submitCardForm);

const validationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorCLassSelector: 'popup__input-error',
  errorClass: 'popup__input-error_visible'
};

enableValidation(validationOptions);