export class Section {
  constructor(containerSelector, renderItemCallback) {
    this._renderItemCallback = renderItemCallback;
    this._container = document.querySelector(containerSelector);
  }

  // Добавляет DOM-элемент в контейнер
  addItem(item) {
    const renderedItem = this._renderItemCallback(item);
    this._container.prepend(renderedItem);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(items) {
    this.clear();
    items.forEach(item => this.addItem(item));
  }
}
