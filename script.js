const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__btn-close");

closeButton.addEventListener("click", function() {
  popup.classList.remove("popup__opened");
  popup.classList.add("popup");
});

const editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', function() {
  popup.classList.remove('popup');
  popup.classList.add('popup__opened');
});

const saveButton = document.querySelector('.popup__btn-save');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__job');

saveButton.addEventListener('click', function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popup.classList.remove('popup__opened');
  popup.classList.add("popup");
});

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup__opened');
});

const likeButton = document.querySelectorAll('.element__button-like');

likeButton.forEach(button => {
  button.addEventListener('click', function() {
    button.classList.toggle('element__button-like');
    button.classList.toggle('element__button-like_active');
  });
});