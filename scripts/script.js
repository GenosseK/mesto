const popup = document.querySelector('.popup');
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

// функция закрытия popup по клику на крестик

function closebuttonPopup(buttonClose) {
  const popup = buttonClose.closest('.popup');
  popup.classList.remove('popup_opened');
}

buttonClose.forEach(function (buttonClose) {
  buttonClose.addEventListener('click', function () {
    closebuttonPopup(buttonClose);
  });
});

/* buttonClose.forEach(function(closeBtn) {
  closeBtn.addEventListener('click', function() {
    const popup = closeBtn.closest('.popup');
    popup.classList.remove('popup_opened');
  });
});
*/

// функция закрытия popup

function closePopup(popupToClose) {
  popupToClose.classList.remove('popup_opened');
}

//buttonClose.addEventListener("click", closePopup);


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

// массив с изначальными карточками, которые будет добавляться в начало grid при загрузке сраницы

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// функция добавления карточек из массива

const elementsGrid = document.querySelector('.elements__grid');
const cardsTemplate = document.querySelector('.cards-template').content;

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

const form = document.forms.addCard;

function cardSubmitHandler(event) {
  event.preventDefault();
  const title = form.elements.title.value;
  const url = form.elements.url.value;

  const cardElement = cardsTemplate.cloneNode(true);
  cardElement.querySelector('.element__image').src = url;
  cardElement.querySelector('.element__image').alt = title;
  cardElement.querySelector('.element__caption').textContent = title;

  elementsGrid.prepend(cardElement);
  closePopup(popupAddCard);
}

form.addEventListener('submit', cardSubmitHandler);

// функция кнопки like

const buttonLike = document.querySelectorAll('.element__button-like');

for (let button of buttonLike) {
  button.addEventListener('click', function () {
    button.classList.toggle('element__button-like_active');
  });
}