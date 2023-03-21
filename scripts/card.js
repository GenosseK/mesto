export default class Card {
    constructor(data, templateSelector, openPopup) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openPopup = openPopup;
      }

    _getTemplate() {
        const templateElement = document
            .querySelector(this._templateSelector)
            .content.querySelector('.element')
            .cloneNode(true);
        return templateElement;
    }

    _setEventListeners(cardElement) {
        const imageElement = cardElement.querySelector('.element__image');
        const buttonLike = cardElement.querySelector('.element__button-like');
        const buttonDelete = cardElement.querySelector('.element__button-delete');

        buttonLike.addEventListener('click', () => {
            this._handleLikeButton(buttonLike);
        });

        buttonDelete.addEventListener('click', () => {
            this._handleDeleteButton(cardElement);
        });

        imageElement.addEventListener('click', () => {
            this._handleImageClick();
        });
    }

    _handleLikeButton(buttonLike) {
        buttonLike.classList.toggle('element__button-like_active');
    }

    _handleDeleteButton(cardElement) {
        cardElement.remove();
    }

    _handleImageClick() {
        const popupImage = document.querySelector('.popup__image');
        const popupFigcaption = document.querySelector('.popup__figcaption');
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupFigcaption.textContent = this._name;
        const imageViewerPopup = document.querySelector('.popup_image-viewer');
        this._openPopup(imageViewerPopup);
    }

    createCard() {
        this._element = this._getTemplate();
        const imageElement = this._element.querySelector('.element__image');
        const captionElement = this._element.querySelector('.element__caption');

        imageElement.src = this._link;
        imageElement.alt = this._name;
        captionElement.textContent = this._name;

        this._setEventListeners(this._element);

        return this._element;
    }
}
