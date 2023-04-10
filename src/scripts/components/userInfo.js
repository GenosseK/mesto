export default class UserInfo {
    constructor({ userNameElement, userInfoElement }) {
        this._userNameElement = document.querySelector(userNameElement);
        this._userInfoElement = document.querySelector(userInfoElement);
    }

    getUserInfo() {
        return {
           userName: this._userNameElement.textContent,
           userDescription: this._userInfoElement.textContent
        };
     }

    setUserInfo({ userName, userDescription }) {
        this._userNameElement.textContent = userName;
        this._userInfoElement.textContent = userDescription;
    }
}
