export default class UserInfo {
    constructor({ userNameElement, userInfoElement }) {
        this._userNameElement = document.querySelector(userNameElement);
        this._userInfoElement = document.querySelector(userInfoElement);
    }

    getUserInfo() {
        return {
           name: this._userNameElement.textContent,
           description: this._userInfoElement.textContent
        };
     }

    setUserInfo(element) {
        this._userNameElement.textContent = element.name;
        this._userInfoElement.textContent = element.description;
    }
}
