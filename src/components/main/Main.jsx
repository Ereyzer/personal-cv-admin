import { useEffect, useState } from 'react';

import { apiService } from '../../config';
import Avatar from './avatar/Avatar';
import { useUser } from '../context/user/userContext';
import MyLoader from '../loader/loader';

function Main() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  console.log(useUser());

  const patchData = payload => {
    setData({ ...payload, ...data });
  };

  useEffect(() => {
    (async () => {
      try {
        const info = await apiService.getAllInfo();
        setData({ ...info });
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main>
      {loading && <MyLoader />}
      {!loading && <Avatar imgUrl={data.avatar} setImgUrl={patchData} />}
      {!loading && error && <p>error</p>}
    </main>
  );
}

export default Main;
