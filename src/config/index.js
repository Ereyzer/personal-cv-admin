import services from '../services';
import { API_DOMAIN } from './constants';

export const constants = {
  API_DOMAIN,
};

export const apiService = new services.ApiService(API_DOMAIN);
export const localStrageService = new services.LocalStorageService();
