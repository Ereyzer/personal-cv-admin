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

  //   write = ([key, value]) => {
  //     localStorage.setItem(key, JSON.stringify(value));
  //   };

  setAccsessToken = t => {
    this.#accessToken = t;
    localStorage.setItem('accessToken', JSON.stringify(t));
  };

  getAccessToken = () => this.#accessToken;
}
