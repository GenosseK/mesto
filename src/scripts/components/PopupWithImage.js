import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement)
        this._popupImage = this._popupElement.querySelector('.popup__image');
        this._popupFigcaption = this._popupElement.querySelector('.popup__figcaption');
    }

    open(item) {
        super.open();
        this._popupImage.src = item.link;
        this._popupImage.alt = item.name;
        this._popupFigcaption.textContent = item.name;
    }
}
