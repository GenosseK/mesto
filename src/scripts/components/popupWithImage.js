import Popup from './popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupImage = this._popupSelector.querySelector('.popup__image');
        this._popupFigcaption = this._popupSelector.querySelector('.popup__figcaption');
    }

    open(item) {
        super.open();
        this._popupImage.src = item.link;
        this._popupImage.alt = item.name;
        this._popupFigcaption.textContent = item.name;
        document.body.style.overflow = 'hidden'; // disable scroll
    }

    close() {
        super.close();
        document.body.style.overflow = ''; // enable scroll
    }
}