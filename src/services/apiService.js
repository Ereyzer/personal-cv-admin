import axios from 'axios';

export class ApiService {
  #BASE_URL;
  #bearer;
  constructor(baseUrl) {
    this.#BASE_URL = baseUrl;
  }

  getAllInfo = async () => {
    const url = this.#BASE_URL + '/admin/info';
    const info = await axios.get(url);

    return info.data.data;
  };

  login = async (email, password) => {
    const url = this.#BASE_URL + '/auth/login';

    const response = await axios.post(url, { email, password });
    const { accessToken } = response.data.data;
    return accessToken;
  };

  checkIsOnline = async token => {
    const url = this.#BASE_URL + '/auth/isuser';
    this.#bearer = `Bearer ${token}`;

    try {
      await axios.get(url, { headers: { Authorization: this.#bearer } });
      return true;
    } catch {
      // TODO: refresh or ofline
      console.log('offline');
      return false;
    }
  };
}
