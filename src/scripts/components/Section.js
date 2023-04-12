export default class Section {
    constructor({ renderer }, containerSelector) {
        
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }


    addItem(card) {
        this._container.prepend(card)
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item)
        })
    }
}
