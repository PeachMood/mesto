export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderItems() {
    this.clear();
    this._items.forEach(this._renderer);
  }
}
