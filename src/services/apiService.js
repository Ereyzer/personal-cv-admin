import axios from 'axios';
import { localStorageService } from '../config';

export class ApiService {
  #BASE_URL;
  #bearer;
  constructor(baseUrl) {
    this.#BASE_URL = baseUrl;
    this.updateFullAvatar = this.autorizationHendler(this.updateFullAvatar);
    this.updateCutAvatar = this.autorizationHendler(this.updateCutAvatar);
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

      const { accessToken } = response.data.data;
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
  autorizationHendler = func => {
    return async (...args) => {
      try {
        // func.aplly(this, args);
        console.log('auth try');

        return await func(...args);
      } catch (error) {
        console.log(' I handle it');
        if (error.status === 401) {
          if (await this.refreshToken()) {
            return await func(...args);
          } else {
            console.log(error);
            throw new Error(error.message);
          }
        } else {
          console.log('not auth error');
          console.log(error);
          throw new Error(error.message);
        }
      }
    };
  };
  // download avatar
  updateFullAvatar = async avatar => {
    const url = this.#BASE_URL + '/admin/files/avatar';
    const headers = {
      Authorization: this.#bearer,
    };
    const form = new FormData();
    form.append('my_field', 'avatar');
    form.append('avatar', avatar);

    const response = await axios.post(url, form, {
      headers,
    });
    return response.data;
  };
  updateCutAvatar = async avatar => {
    const url = this.#BASE_URL + '/admin/files/cutavatar';
    const headers = {
      Authorization: this.#bearer,
    };
    const form = new FormData();
    // form.append('my_field', 'avatar');
    // form.append('avatar', avatar);
    form.append('avatar', avatar, 'cut_avatar.jpg');

    const response = await axios.post(url, form, {
      headers,
    });
    return response.data;
  };
}
