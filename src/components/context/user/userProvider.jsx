import { useEffect, useState } from 'react';
import { UserContext } from './userContext';
import { apiService, localStorageService } from '../../../config';
import MyLoader from '../../loader/loader';

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [load, setLoad] = useState(false);

  const logIn = () => {
    setIsLoggedIn(true);
  };

  const logOut = () => {
    apiService.logout();
    localStorageService.rmAccessToken();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const items = localStorageService.read();
    if (items.includes('accessToken')) {
      const token = localStorageService.getAccessToken();
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
    } else {
      setLoad(true);
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
