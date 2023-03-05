const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, options) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, options);
    } else {
        hideInputError(formElement, inputElement, options);
    }
};

const toggleButtonState = (buttonElement, isActive, inactiveButtonClass) => {
    buttonElement.classList.toggle(inactiveButtonClass, !isActive);
    buttonElement.disabled = !isActive;
};

const setEventListeners = (formElement, options) => {
    const inputList = [...formElement.querySelectorAll(options.inputSelector)];
    const submitButtonElement = formElement.querySelector(options.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, options);
            toggleButtonState(submitButtonElement, formElement.checkValidity(), options.inactiveButtonClass);
        });
    });

    toggleButtonState(submitButtonElement, formElement.checkValidity(), options.inactiveButtonClass);
};

const enableValidation = (options) => {
    const formList = [...document.querySelectorAll(options.formSelector)];
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, options);
    });
};

const resetValidation = (formElement, options) => {
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    const errorList = Array.from(formElement.querySelectorAll(`.${options.errorClass}`));
    const submitButtonElement = formElement.querySelector(options.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, options);
    });

    errorList.forEach((errorElement) => {
        errorElement.textContent = '';
        errorElement.classList.remove(options.errorClass);
    });

    toggleButtonState(submitButtonElement, formElement.checkValidity(), options.inactiveButtonClass);
};