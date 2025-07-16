import { useEffect, useState } from 'react';
import { UserContext } from './userContext';
import { apiService, localStrageService } from '../../../config';
import MyLoader from '../../loader/loader';

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [load, setLoad] = useState(false);

  const logIn = () => {
    setIsLoggedIn(true);
  };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const items = localStrageService.read();
    if (items.includes('accessToken')) {
      const token = localStrageService.getAccessToken();
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
