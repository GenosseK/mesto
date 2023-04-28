export default class UserInfo {
    constructor({ userNameElement, userInfoElement, userAvatar }) {
        this._userNameElement = document.querySelector(userNameElement);
        this._userInfoElement = document.querySelector(userInfoElement);
        this._userAvatar = document.querySelector(userAvatar)
    }

    getUserInfo() {
        return {
           userName: this._userNameElement.textContent,
           userDescription: this._userInfoElement.textContent
        };
     }

    setUserInfo({ userName, userDescription, userAvatar }) {
        this._userNameElement.textContent = userName;
        this._userInfoElement.textContent = userDescription;
        this._userAvatar.src = userAvatar;
    }
}
