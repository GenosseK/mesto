const popupElement = document.querySelector('.popup');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupAddCard = document.querySelector('.popup_add-card')
const buttonsClose = document.querySelectorAll('.popup__btn-close');
const buttonEdit = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__job');
const formEditProfile = document.querySelector('.popup__form');
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
  const openedPopup = buttonClose.closest('.popup_opened');
  closePopup(openedPopup);
}

buttonsClose.forEach(function (buttonClose) {
  buttonClose.addEventListener('click', function () {
    closePopupByCrossButton(buttonClose);
  });
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
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
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

  const formElement = popupToClose.querySelector('.popup__form');
  if (formElement) {
    resetValidation(formElement, validationOptions);
  }
}

// функция редактирования профиля

function openEditProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupProfileEdit);
}

buttonEdit.addEventListener('click', openEditProfileForm);

// функция открытия popup добавления карточки

buttonOpenAddCardPopup.addEventListener("click", function () {
  openPopup(popupAddCard);;
});

// функция возврата карточки со слушателями

function createCard(card) {
  const cardElement = cardsTemplate.cloneNode(true);
  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__image').alt = card.name;
  cardElement.querySelector('.element__caption').textContent = card.name;

  const buttonLike = cardElement.querySelector('.element__button-like');
  buttonLike.addEventListener('click', function () {
    buttonLike.classList.toggle('element__button-like_active');
  });

  elementsGrid.addEventListener('click', event => {
    if (event.target.classList.contains('element__button-delete')) {
      const cardElement = event.target.closest('.element');
      cardElement.remove();
    }
  });

  const imageViewer = cardElement.querySelector('.element__image');
  imageViewer.addEventListener('click', function () {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupFigcaption.textContent = card.name;
    openPopup(imageViewerPopup);
  });

  return cardElement;
}

// функция добавления карточек из массива

initialCards.forEach(card => {
  const cardElement = createCard(card);
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

function submitCardHandler(event) {
  event.preventDefault();
  const title = formAddCard.elements.title.value;
  const url = formAddCard.elements.url.value;
  const card = {
    name: title,
    link: url
  };
  const cardElement = createCard(card);
  elementsGrid.prepend(cardElement);
  closePopup(popupAddCard);
  formAddCard.reset();
}

formAddCard.addEventListener('submit', submitCardHandler);

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