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

function closePopup(buttonClose) {
  const popup = buttonClose.closest('.popup');
  popup.classList.remove('popup_opened');
}

buttonClose.forEach(function(buttonClose) {
  buttonClose.addEventListener('click', function() {
    closePopup(buttonClose);
  });
});

/* buttonClose.forEach(function(closeBtn) {
  closeBtn.addEventListener('click', function() {
    const popup = closeBtn.closest('.popup');
    popup.classList.remove('popup_opened');
  });
});
*/

/* function closePopup() {
  popup.classList.remove("popup_opened");
}

buttonClose.addEventListener("click", closePopup);
*/
function editPopup() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popupProfileEdit.classList.add('popup_opened');
}

buttonEdit.addEventListener('click', editPopup);

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup()
}

popupForm.addEventListener('submit', formSubmitHandler);

buttonAdd.addEventListener("click", function () {
  popupAddCard.classList.add("popup_opened");
});



/*
const buttonLike = document.querySelectorAll('.element__button-like');

for (let button of buttonLike) {
  button.addEventListener('click', function () {
    button.classList.toggle('element__button-like_active');
  });
}
*/
