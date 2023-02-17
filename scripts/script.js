const popupElement = document.querySelector('.popup');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupAddCard = document.querySelector('.popup_add-card')
const buttonClose = document.querySelectorAll('.popup__btn-close');
const buttonEdit = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__job');
const popupForm = document.querySelector('.popup__form');
const buttonAdd = document.querySelector('.profile__add-button');
const elementsGrid = document.querySelector('.elements__grid');
const cardsTemplate = document.querySelector('.cards-template').content;
const form = document.forms.addCard;
const imageViewerPopup = document.querySelector('#imageViewerPopup');
const popupImage = imageViewerPopup.querySelector('.popup__image');
const popupFigcaption = imageViewerPopup.querySelector('.popup__figcaption');

// функция закрытия popup по клику на крестик

function closePopupButton(buttonClose) {
  const popupElement = buttonClose.closest('.popup');
  popupElement.classList.remove('popup_opened');
}

buttonClose.forEach(function (buttonClose) {
  buttonClose.addEventListener('click', function () {
    closePopupButton(buttonClose);
  });
});

// функция открытия popup

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

// функция закрытия popup

function closePopup(popupToClose) {
  popupToClose.classList.remove('popup_opened');
}

// функция редактирования профиля

function editPopup() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupProfileEdit);
}

buttonEdit.addEventListener('click', editPopup);

// функция submit редактирования профиля

function submitFormHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfileEdit);
}

popupForm.addEventListener('submit', submitFormHandler);

// функция открытия popup добавления карточки

buttonAdd.addEventListener("click", function () {
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

// функция добавления карточки через popup

function submitCardHandler(event) {
  event.preventDefault();
  const title = form.elements.title.value;
  const url = form.elements.url.value;

  const card = {
    name: title,
    link: url
  };

  const cardElement = createCard(card);

  elementsGrid.prepend(cardElement);
  closePopup(popupAddCard);
  form.reset();
}

form.addEventListener('submit', submitCardHandler);