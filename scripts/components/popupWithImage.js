import Popup from './popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupImage = this._popupSelector.querySelector('.popup__image');
        this._popupFigcaption = this._popupSelector.querySelector('.popup__figcaption');
    }

    open({ name, link} ) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupFigcaption.textContent = name;
        super.open();
    }
}