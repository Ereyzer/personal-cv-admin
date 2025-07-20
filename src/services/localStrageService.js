export class LocalStorageService {
  #accessToken;
  constructor() {}

  read = () => {
    const localList = [];
    this.#accessToken = JSON.parse(localStorage.getItem('accessToken'));
    if (this.#accessToken) {
      localList.push('accessToken');
    }
    return localList;
  };

  rmAccessToken = () => {
    localStorage.removeItem('accessToken');
    this.#accessToken = null;
  };
  setAccessToken = t => {
    this.#accessToken = t;
    localStorage.setItem('accessToken', JSON.stringify(t));
  };

  getAccessToken = () => this.#accessToken;
}
