export class Section {
  constructor(containerSelector, renderItemCallback) {
    this._renderItemCallback = renderItemCallback;
    this._container = document.querySelector(containerSelector);
  }

  setItems(items) {
    this._items = items;
  }

  addItem(item) {
    this._container.prepend(item);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();
    this._items.forEach(this._renderItemCallback);
  }
}
