export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  _sendRequest(endpoint, options) {
    options.headers = this._headers;
    return fetch(`${this._baseUrl}/${endpoint}`, options)
      .then(this._checkResponse);
  }

  getUserInfo() {
    return this._sendRequest('users/me', { method: 'GET' });
  }

  getInitialCards() {
    return this._sendRequest('cards', { method: 'GET' });
  }

  editUserInfo(userInfo) {
    return this._sendRequest('users/me', {
      method: 'PATCH',
      body: JSON.stringify(userInfo)
    });
  }

  editUserAvatar(avatar) {
    return this._sendRequest('users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify(avatar)
    });
  }

  addCard(card) {
    return this._sendRequest('cards', {
      method: 'POST',
      body: JSON.stringify(card)
    });
  }

  deleteCard(cardId) {
    return this._sendRequest(`cards/${cardId}`, { method: 'DELETE' });
  }

  addLike(cardId) {
    return this._sendRequest(`cards/${cardId}/likes`, { method: 'PUT' });
  }

  deleteLike(cardId) {
    return this._sendRequest(`cards/${cardId}/likes`, { method: 'DELETE' });
  }
}
