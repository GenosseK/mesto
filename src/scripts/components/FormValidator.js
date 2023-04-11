export default class FormValidator {
    constructor(formElement, options) {
        this._formElement = formElement;
        this._options = options;
        this._inputList = [...this._formElement.querySelectorAll(this._options.inputSelector)];
        this._submitButtonElement = this._formElement.querySelector(this._options.submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._options.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._options.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._options.inputErrorClass);
        errorElement.classList.remove(this._options.errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    toggleButtonState(isActive) {
        this._submitButtonElement.classList.toggle(this._options.inactiveButtonClass, !isActive);
        this._submitButtonElement.disabled = !isActive;
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState(this._formElement.checkValidity());
            });
        });

        this.toggleButtonState(this._formElement.checkValidity());
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        /*
        const errorList = Array.from(this._formElement.querySelectorAll(`.${this._options.errorClass}`));
        errorList.forEach((errorElement) => {
            errorElement.textContent = '';
            errorElement.classList.remove(this._options.errorClass);
        });
        */
        this.toggleButtonState(this._formElement.checkValidity());
    }
}