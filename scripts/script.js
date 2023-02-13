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
const addCardForm = document.forms.addCard;
const elementsGrid = document.querySelector('.elements__grid');

addCardForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const titleInput = addCardForm.elements.title;
    const linkInput = addCardForm.elements.url;

    const title = titleInput.value;
    const link = linkInput.value;

    const newCard = `
        <li class="element">
            <button type="button" class="element__button-delete"></button>
            <img src="${link}" alt="${title}" class="element__image">
            <div class="element__info">
                <h2 class="element__caption">${title}</h2>
                <button aria-label="Нравится" type="button" class="element__button-like"></button>
            </div>
        </li>
    `;

    elementsGrid.insertAdjacentHTML('beforeend', newCard);

    titleInput.value = '';
    linkInput.value = '';
});
*/

/*
const buttonLike = document.querySelectorAll('.element__button-like');

for (let button of buttonLike) {
  button.addEventListener('click', function () {
    button.classList.toggle('element__button-like_active');
  });
}
*/
