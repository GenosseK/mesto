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
  const isNameInputValid = isValid(formEditProfile, nameInput);
  const isDescriptionInputValid = isValid(formEditProfile, descriptionInput);
  if (isNameInputValid && isDescriptionInputValid) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(popupProfileEdit);
  }
}

formEditProfile.addEventListener('submit', submitEditProfileForm);

// функция добавления карточки через popup

function submitCardHandler(event) {
  event.preventDefault();
  const isTitleInputValid = isValid(formAddCard, formAddCard.elements.title);
  const isUrlInputValid = isValid(formAddCard, formAddCard.elements.url);
  if (isTitleInputValid && isUrlInputValid) {
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
}

formAddCard.addEventListener('submit', submitCardHandler);

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_visible');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
      return false;
  } else {
      hideInputError(formElement, inputElement);
      return true;
  }
};

const toggleButtonState = (buttonElement, isFormValid) => {
  if (isFormValid) {
      buttonElement.classList.remove('popup__btn-save_disabled');
      buttonElement.disabled = false;
  } else {
      buttonElement.classList.add('popup__btn-save_disabled');
      buttonElement.disabled = true;
  }
};



/*
const enableValidation = ({
  formSelector,
  submitSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
      setEventListeners(form, {
          formSelector,
          submitSelector,
          submitButtonSelector,
          inactiveButtonClass,
          inputErrorClass,
          errorClass,
      });
  });
};

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

enableValidation(config);
*/

const setEventListeners = (formElement, buttonElement) => {
  const inputList = formElement.querySelectorAll('.popup__input');
  const isFormValid = formElement.checkValidity();
  toggleButtonState(buttonElement, isFormValid);
  Array.from(inputList).forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      const isFormValid = formElement.checkValidity();
      toggleButtonState(buttonElement, isFormValid);
      isValid(formElement, inputElement);
    });
  });
};

setEventListeners(formEditProfile, formEditProfile.querySelector('.popup__btn-save'));
setEventListeners(formAddCard, formAddCard.querySelector('.popup__btn-save'));




















// ВОЗМОЖНЫЙ EVENT LISTENERS
/*
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const setEventListeners = (config, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(buttonElement, formElement.checkValidity());
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(buttonElement, formElement.checkValidity());
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(config, formElement);
  });
};

enableValidation(config);
*/




// test !!! 
/*
const showInputError = ({form, input, error}, errorMessage) => {
  input.classList.add('popup__input_type_error');
  error.textContent = errorMessage;
  error.classList.add('popup__input-error_visible');
};

const hideInputError = ({form, input, error}) => {
  input.classList.remove('popup__input_type_error');
  error.classList.remove('popup__input-error_visible');
  error.textContent = '';
};

const validateInput = (input) => {
  const {form} = input;
  const error = form.querySelector(`.${input.id}-error`);
  if (!input.validity.valid) {
    showInputError({form, input, error}, input.validationMessage);
    return false;
  } else {
    hideInputError({form, input, error});
    return true;
  }
};

const setEventListeners = (form) => {
  const inputs = form.querySelectorAll('.popup__input');
  const button = form.querySelector('.popup__btn-save');
  
  const toggleButtonState = () => {
    if (form.checkValidity()) {
      button.classList.remove('popup__btn-save_disabled');
      button.disabled = false;
    } else {
      button.classList.add('popup__btn-save_disabled');
      button.disabled = true;
    }
  };
  
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      toggleButtonState();
      validateInput(input);
    });
  });
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
};

const enableValidation = (config) => {
  document.querySelectorAll(config.formSelector).forEach(form => setEventListeners(form, config));
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});
*/