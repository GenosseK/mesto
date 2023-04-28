export const buttonEdit = document.querySelector('.profile__edit-button');
export const formEditProfile = document.forms.profileEdit;
export const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
export const formAddCard = document.forms.addCard;
export const formChangeAvatar = document.forms.changeAvatar;
export const avatarButton = document.querySelector('.profile__avatar-edit-button');

// Валидация
export const validationOptions = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorCLassSelector: 'popup__input-error',
    errorClass: 'popup__input-error_visible'
};