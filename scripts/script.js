const popup = document.querySelector(".popup");
const buttonClose = document.querySelector(".popup__btn-close");
const buttonEdit = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__job');
const popupForm = document.querySelector('.popup__form');

function closePopup() {
  popup.classList.remove("popup_opened");
}

buttonClose.addEventListener("click", closePopup);

function editPopup() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

buttonEdit.addEventListener('click', editPopup);

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup()
}

popupForm.addEventListener('submit', formSubmitHandler);

/*
const buttonLike = document.querySelectorAll('.element__button-like');

for (let button of buttonLike) {
  button.addEventListener('click', function () {
    button.classList.toggle('element__button-like_active');
  });
}
*/
