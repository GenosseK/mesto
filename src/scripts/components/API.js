export default class API {
    constructor(settings) {
        this._baseURL = settings.baseURL;
        this._headers = settings.headers;
    }

    _handleResponseStatus(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Error: ${response.status}`);
        }
    }

    getUserInfo() {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(this._handleResponseStatus);
    }

    editUserInfo({ name, about }) {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(this._handleResponseStatus);
    }

    getInitialCards() {
        return fetch(`${this._baseURL}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._handleResponseStatus)
    }

    addCard({ name, link }) {
        return fetch(`${this._baseURL}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._handleResponseStatus)
    }

    deleteCard(cardID) {
        return fetch(`${this._baseURL}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._handleResponseStatus)
    }

    addLike(cardID) {
        return fetch(`${this._baseURL}/cards/${cardID}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this._handleResponseStatus)
    }

    deleteLike(cardID) {
        return fetch(`${this._baseURL}/cards/${cardID}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._handleResponseStatus)
    }

    changeAvatar(data) {
        return fetch(`${this._baseURL}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.userAvatar
            }),
        })
            .then(this._handleResponseStatus)
    }

}