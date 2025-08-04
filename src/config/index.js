import services from '../services';
import { API_DOMAIN, languages } from './constants';

export const constants = {
  API_DOMAIN,
  languages,
};

export const apiService = new services.ApiService(API_DOMAIN);
export const localStorageService = new services.LocalStorageService();
