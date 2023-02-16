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

function openPopup(popup) {
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
  popupProfileEdit.classList.add('popup_opened');
}

buttonEdit.addEventListener('click', editPopup);

// функция submit редактирования профиля

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfileEdit);
}

popupForm.addEventListener('submit', formSubmitHandler);

// функция открытия popup добавления карточки

buttonAdd.addEventListener("click", function () {
  popupAddCard.classList.add("popup_opened");
});

// функция добавления карточек из массива

initialCards.forEach(card => {
  const cardElement = cardsTemplate.cloneNode(true);
  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__image').alt = card.name;
  cardElement.querySelector('.element__caption').textContent = card.name;
  elementsGrid.prepend(cardElement);
});

elementsGrid.addEventListener('click', event => {
  if (event.target.classList.contains('element__button-delete')) {
    const cardElement = event.target.closest('.element');
    cardElement.remove();
  }
});

// функция добавления карточек

function cardSubmitHandler(event) {
  event.preventDefault();
  const title = form.elements.title.value;
  const url = form.elements.url.value;

  const cardElement = cardsTemplate.cloneNode(true);
  cardElement.querySelector('.element__image').src = url;
  cardElement.querySelector('.element__image').alt = title;
  cardElement.querySelector('.element__caption').textContent = title;

  const buttonLike = cardElement.querySelector('.element__button-like');
  buttonLike.addEventListener('click', function () {
    buttonLike.classList.toggle('element__button-like_active');
  });

  elementsGrid.prepend(cardElement);
  closePopup(popupAddCard);
  form.reset();
}

form.addEventListener('submit', cardSubmitHandler);

// функция кнопки like

const buttonLike = document.querySelectorAll('.element__button-like');

for (let button of buttonLike) {
  button.addEventListener('click', function () {
    button.classList.toggle('element__button-like_active');
  });
}

// popup image-viewer

elementsGrid.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('element__image')) {
    popupImage.src = target.src;
    popupImage.alt = target.alt;
    popupFigcaption.textContent = target.alt;
    openPopup(imageViewerPopup);
  }
});


buttonClose.forEach(function (button) {
  button.addEventListener("click", () => {
    closePopup(imageViewerPopup);
  });
});