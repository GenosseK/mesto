const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__btn-close");

closeButton.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

const editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
});

const saveButton = document.querySelector('.popup__btn-save');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__job');

nameInput.addEventListener('input', function () {
  if (nameInput.value.length >= 2 && nameInput.value.length < 40 && descriptionInput.value.length >= 2 && descriptionInput.value.length < 40) {
    saveButton.removeAttribute('disabled');
    saveButton.classList.remove('popup__btn-save_disabled');
  } else {
    saveButton.setAttribute('disabled', true);
    saveButton.classList.add('popup__btn-save_disabled');
  }
});

descriptionInput.addEventListener('input', function () {
  if (nameInput.value.length >= 2 && nameInput.value.length < 40 && descriptionInput.value.length >= 2 && descriptionInput.value.length < 40) {
    saveButton.removeAttribute('disabled');
    saveButton.classList.remove('popup__btn-save_disabled');
  } else {
    saveButton.setAttribute('disabled', true);
    saveButton.classList.add('popup__btn-save_disabled');
  }
});

saveButton.addEventListener('click', function (event) {
  event.preventDefault();
  if (!saveButton.classList.contains('popup__btn-save_disabled')) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    popup.classList.remove('popup_opened');
  }
});


closeButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

const likeButton = document.querySelectorAll('.element__button-like');

likeButton.forEach(button => {
  button.addEventListener('click', function () {
    button.classList.toggle('element__button-like');
    button.classList.toggle('element__button-like_active');
  });
});