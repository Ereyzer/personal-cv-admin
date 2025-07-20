import axios from 'axios';
import { localStorageService } from '../config';

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

    const response = await axios.post(url, { email, password }, { withCredentials: true });

    const { accessToken } = response.data.data;
    this.#bearer = `Bearer ${accessToken}`;
    return accessToken;
  };

  checkIsOnline = async token => {
    const url = this.#BASE_URL + '/auth/isuser';
    this.#bearer = `Bearer ${token}`;

    try {
      await axios.get(url, { headers: { Authorization: this.#bearer } });
      return true;
    } catch {
      return await this.refreshToken();
    }
  };

  refreshToken = async () => {
    const url = this.#BASE_URL + '/auth/refresh';

    try {
      const response = await axios.post(url, {}, { withCredentials: true });
      const { accessToken } = response.body.body;
      localStorageService.setAccessToken(accessToken);
      this.#bearer = `Bearer ${accessToken}`;
      return true;
    } catch {
      return false;
    }
  };
  logout = () => {
    const url = this.#BASE_URL + '/auth/logout';
    const headers = {
      Authorization: this.#bearer,
    };

    axios.post(
      url,
      {},
      {
        headers,
        withCredentials: true,
      }
    );
    this.#bearer = null;
  };
}
