import React, { useEffect } from 'react';
import { UserProvider } from './user/userProvider';

function ContextProviders({ children }) {
  useEffect(() => {
    window.addEventListener('error', e => {
      console.log('Handle error');
      console.log(e);
      console.log('try');
    });
  }, []);
  return <UserProvider>{children}</UserProvider>;
}

export default ContextProviders;
