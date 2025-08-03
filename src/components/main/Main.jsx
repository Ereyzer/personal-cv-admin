import { useEffect, useState } from 'react';

import { apiService } from '../../config';
import MyLoader from '../loader/loader';
import AvatarSection from './avatar/Avatar';
import Intro from './intro/Intro';

function Main() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const patchData = payload => {
    setData({ ...data, ...payload });
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
      {!loading && (
        <>
          <AvatarSection imgUrl={data.avatar.cut} setImgUrl={patchData} />
          <Intro patchData={patchData} data={data} />
        </>
      )}
      {!loading && error && <p>error</p>}
    </main>
  );
}

export default Main;
