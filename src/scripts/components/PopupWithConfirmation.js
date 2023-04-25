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

/*
export default class PopupWithConfirmation extends Popup {
    constructor(popupElement, {handleFormSubmit}) {
        super(popupElement);
        this._buttonSave = this._popupElement.querySelector('.popup__btn-save');
        this._handleFormSubmit = handleFormSubmit;
    }

    open(cardElement, idCard) {
        super.open();
        this.id = idCard;
        this.card = cardElement;
    }

    setEventListeners() {
        super.setEventListeners();
        this._buttonSave.addEventListener('click', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this.id, this.card);
        })
    }

}*/

/*
  open(cardElement, idCard) {
    super.open();
    this._id = idCard;
    this._card = cardElement;
  }
*/