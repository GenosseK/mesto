const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__btn-close");

closeButton.addEventListener("click", function () {
  popup.classList.remove("popup__opened");
  popup.classList.add("popup");
});

const editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', function () {
  popup.classList.remove('popup');
  popup.classList.add('popup__opened');
});

const saveButton = document.querySelector('.popup__btn-save');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__job');

let initialNameValue = nameInput.value;
let initialDescriptionValue = descriptionInput.value;

function checkInputs() {
  if (nameInput.value.length >= 2 && nameInput.value.length < 40 && descriptionInput.value.length >= 2 && descriptionInput.value.length < 40) {
    saveButton.classList.remove('popup__btn-save_disabled');
  } else {
    saveButton.classList.add('popup__btn-save_disabled');
  }
}

nameInput.addEventListener('input', checkInputs);
descriptionInput.addEventListener('input', checkInputs);

saveButton.addEventListener('click', function (event) {
  event.preventDefault();
  if (!saveButton.classList.contains('popup__btn-save_disabled') && (nameInput.value !== initialNameValue || descriptionInput.value !== initialDescriptionValue)) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    initialNameValue = nameInput.value;
    initialDescriptionValue = descriptionInput.value;
    popup.classList.remove('popup__opened');
    popup.classList.add("popup");
  }
});

checkInputs();

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup__opened');
});

const likeButton = document.querySelectorAll('.element__button-like');

likeButton.forEach(button => {
  button.addEventListener('click', function () {
    button.classList.toggle('element__button-like');
    button.classList.toggle('element__button-like_active');
  });
});