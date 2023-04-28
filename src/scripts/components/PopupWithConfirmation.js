import Popup from "./Popup.js";


export default class PopupWithConfirmation extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._submitButton = this._popupElement.querySelector('.popup__btn-save');
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = 'Удаление...';
    } else {
      this._submitButton.textContent = 'Да'
    }
  }

  setConfirm(callback) {
    this._handleConfirmationCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleConfirmationCallback()
    })
  }
}