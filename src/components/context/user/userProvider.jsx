import { useEffect, useState } from 'react';
import { UserContext } from './userContext';
import { apiService, localStorageService } from '../../../config';
import MyLoader from '../../loader/loader';

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [load, setLoad] = useState(false);

  const logIn = () => {
    setIsLoggedIn(true);
    apiService.setLogoutContext(() => {
      localStorageService.rmAccessToken();
      setIsLoggedIn(false);
    });
  };

  const logOut = () => {
    apiService.logout();
    localStorageService.rmAccessToken();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorageService.getAccessToken();
    if (!token) {
      setLoad(true);
    } else {
      apiService
        .checkIsOnline(token)
        .then(res => {
          if (res) {
            logIn();
          }
        })
        .finally(() => {
          setLoad(true);
        });
    }
  }, []);

  return !load ? (
    <MyLoader />
  ) : (
    <UserContext
      value={{
        isLoggedIn,
        logIn,
        logOut,
      }}
    >
      {children}
    </UserContext>
  );
};
