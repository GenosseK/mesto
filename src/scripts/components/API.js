export default class API {
    constructor(settings) {
        this._baseURL = settings.baseURL;
        this._headers = settings.headers;
    }

    getUserInfo() {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Error: ${response.status}`);
        });
    }

    editUserInfo({ name, about }) {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Error: ${response.status}`);
        });
    }

    getInitialCards() {
        return fetch(`${this._baseURL}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`)
            })
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
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`)
            })
    }

    deleteCard(cardID) {
        return fetch(`${this._baseURL}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`)
            })
    }

}