export default class Card {
    constructor(data, templateSelector, openPopup, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openPopup = openPopup;
        this._buttonLike = null;
        this._popupImage = null;
        this._popupFigcaption = null;
        this._imageViewerPopup = null;
        this._imageElement = null;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const templateElement = document
            .querySelector(this._templateSelector)
            .content.querySelector('.element')
            .cloneNode(true);
        return templateElement;
    }

    _setEventListeners(cardElement) {
        this._imageElement = cardElement.querySelector('.element__image');
        this._buttonLike = cardElement.querySelector('.element__button-like');
        const buttonDelete = cardElement.querySelector('.element__button-delete');

        this._buttonLike.addEventListener('click', () => {
            this._handleLikeButton();
        });

        buttonDelete.addEventListener('click', () => {
            this._handleDeleteButton(cardElement);
        });

        this._imageElement.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });

        this._popupImage = document.querySelector('.popup__image');
        this._popupFigcaption = document.querySelector('.popup__figcaption');
        this._imageViewerPopup = document.querySelector('.popup_image-viewer');
    }


    _handleLikeButton() {
        this._buttonLike.classList.toggle('element__button-like_active');
    }

    _handleDeleteButton(cardElement) {
        cardElement.remove();
    }

    createCard() {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.element__image');
        const captionElement = this._element.querySelector('.element__caption');

        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        captionElement.textContent = this._name;

        this._setEventListeners(this._element);

        return this._element;
    }
}
