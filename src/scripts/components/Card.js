export default class Card {
    constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, userId) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._likes = data.likes;

        this._templateSelector = templateSelector;

        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        this._userId = userId;
    }

    _getTemplate() {
        const templateElement = document
            .querySelector(this._templateSelector)
            .content.querySelector('.element')
            .cloneNode(true);
        return templateElement;
    }



    _setEventListeners() {
        this._imageElement = this._element.querySelector('.element__image');


        this._buttonLike.addEventListener('click', () => this._handleLikeClick(this._id));

        this._buttonDelete.addEventListener('click', () => this._handleDeleteClick(this._id));

        this._imageElement.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    /*
    _handleLikeButton() {
        this._buttonLike.classList.toggle('element__button-like_active');
    }*/

    _handleDeleteButton(cardElement) {
        cardElement.remove();
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    updateData(newData) {
        this._likes = newData.likes;
    }

    updateLikesStatus() {
        this._likeCounter.textContent = this._likes.length;
        if (this.isLiked()) {
            this._buttonLike.classList.add('element__button-like_active')
        } else {
            this._buttonLike.classList.remove('element__button-like_active')
        }
    }

    isLiked() {
        return this._likes.some((likedCard) => likedCard._id === this._userId)
    }

    createCard() {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.element__image');
        this._captionElement = this._element.querySelector('.element__caption');
        this._buttonDelete = this._element.querySelector('.element__button-delete');
        this._buttonLike = this._element.querySelector('.element__button-like');

        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._captionElement.textContent = this._name;

        this._likeCounter = this._element.querySelector('.element__like-counter');
        this._likeCounter.textContent = this._likes.length;

        if (this._ownerId !== this._userId) {
            this._buttonDelete.classList.add('element__button-delete_hidden');
        }

        if(this.isLiked()) {
            this._buttonLike.classList.add('element__button-like_active');
          }

        this._setEventListeners();

        return this._element;
    }
}
