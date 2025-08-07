import axios from 'axios';
import { localStorageService } from '../config';
import { notifications } from '../utils/notifications';

export class ApiService {
  #BASE_URL;
  #bearer;
  #loguotContext;
  constructor(baseUrl) {
    this.#BASE_URL = baseUrl;
    this.updateFullAvatar = this.autorizationHendler(this.updateFullAvatar);
    this.updateCutAvatar = this.autorizationHendler(this.updateCutAvatar);
    this.updateIntro = this.autorizationHendler(this.updateIntro);
    this.updateAbout = this.autorizationHendler(this.updateAbout);
    this.updatSocialLinks = this.autorizationHendler(this.updatSocialLinks);
    this.removeSocialLink = this.autorizationHendler(this.removeSocialLink);
    this.addHardSkill = this.autorizationHendler(this.addHardSkill);
    this.removeHardSkill = this.autorizationHendler(this.removeHardSkill);
    this.addSoftSkill = this.autorizationHendler(this.addSoftSkill);
    this.removeSoftSkill = this.autorizationHendler(this.removeSoftSkill);
  }

  setLogoutContext = func => {
    this.#loguotContext = func;
  };

  autorizationHendler = func => {
    return async (...args) => {
      try {
        return await func(...args);
      } catch (error) {
        if (error.status === 401) {
          if (await this.refreshToken()) {
            try {
              return await func(...args);
            } catch (error) {
              console.log('not auth error');
              console.log(error);
              notifications.error('some error', 'smesing went wrong');
            }
          } else {
            this.#loguotContext();
          }
        } else {
          console.log('not auth error');
          console.log(error);
          notifications.error('some error', 'smesing went wrong');
        }
      }
    };
  };

  getHeaders = (extraHeaders = {}) => ({
    Authorization: this.#bearer,
    ...extraHeaders,
  });

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
      await axios.get(url, { headers: this.getHeaders() });
      return true;
    } catch (err) {
      console.log('catch error: ', err);

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

    axios.post(
      url,
      {},
      {
        headers: this.getHeaders(),
        withCredentials: true,
      }
    );
    this.#bearer = null;
  };

  // download avatar
  updateFullAvatar = async avatar => {
    const url = this.#BASE_URL + '/admin/files/avatar';

    const form = new FormData();
    form.append('my_field', 'avatar');
    form.append('avatar', avatar);

    const response = await axios.post(url, form, {
      headers: this.getHeaders(),
    });
    return response.data;
  };
  updateCutAvatar = async avatar => {
    const url = this.#BASE_URL + '/admin/files/cutavatar';

    const form = new FormData();
    form.append('avatar', avatar, 'cut_avatar.jpg');

    const response = await axios.post(url, form, {
      headers: this.getHeaders(),
    });
    return response.data;
  };

  updateIntro = async (value, lang) => {
    const url = this.#BASE_URL + `/admin/info/${lang}/intro`;

    const response = await axios.patch(url, { value }, { headers: this.getHeaders() });

    return response.data;
  };

  updateAbout = async (value, lang) => {
    const url = this.#BASE_URL + `/admin/info/${lang}/about`;

    const response = await axios.patch(url, { value }, { headers: this.getHeaders() });
    return response.data;
  };

  updatSocialLinks = async (link, value) => {
    const url = this.#BASE_URL + `/admin/info/${link}`;

    const response = await axios.patch(url, { value }, { headers: this.getHeaders() });
    return response.data;
  };
  removeSocialLink = async link => {
    const url = this.#BASE_URL + `/admin/info/${link}`;

    const response = await axios.delete(url, { headers: this.getHeaders() });
    if (response.status === 204) {
      return true;
    }
    return response;
  };
  getHardSkills = async () => {
    const url = this.#BASE_URL + '/admin/hardSkills?perPage=100&page=1';

    const response = await axios.get(url);

    return response.data;
  };

  addHardSkill = async Skill => {
    const url = this.#BASE_URL + '/admin/hardSkills';

    const response = await axios.post(url, Skill, { headers: this.getHeaders() });
    return response.data;
  };

  removeHardSkill = async id => {
    const url = this.#BASE_URL + `/admin/hardSkills/${id}`;

    const response = await axios.delete(url, { headers: this.getHeaders() });
    if (response.status !== 204) {
      throw new Error('did not delete');
    }
    return response;
  };

  addSoftSkill = async (language, skill) => {
    const url = this.#BASE_URL + '/admin/softSkills';

    const response = await axios.post(
      url,
      { language: language.toUpperCase(), skill },
      { headers: this.getHeaders() }
    );
    return response.data;
  };

  getSoftSkills = async lang => {
    const url = this.#BASE_URL + `/admin/softSkills/${lang}?perPage=100`;
    const response = await axios.get(url);

    return response.data;
  };
  getSoftSkill = async (id, lang) => {
    const url = this.#BASE_URL + `/admin/softSkills/${id}/${lang}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  removeSoftSkill = async id => {
    const url = this.#BASE_URL + `/admin/softSkills/${id}`;

    const response = await axios.delete(url, { headers: this.getHeaders() });
    if (response.status !== 204) {
      throw new Error('did not delete');
    }
    return response;
  };
}
