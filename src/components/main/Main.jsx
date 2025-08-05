import { useEffect, useState } from 'react';

import { apiService } from '../../config';
import MyLoader from '../loader/loader';
import AvatarSection from './avatar/Avatar';
import MultiLangugeItem from './lenguages/MultiLanguageItem';
import IntroItem from './intro/IntroItem';
import AboutItem from './about/AboutItem';
import LinksSection from './linksSection/LincsSection';

import './main.css';
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
          <LinksSection data={data} patchData={patchData} />
          <MultiLangugeItem patchData={patchData} data={data} title={'Intro'} Item={IntroItem} />
          <MultiLangugeItem patchData={patchData} data={data} title={'About'} Item={AboutItem} />
        </>
      )}
      {!loading && error && <p>error</p>}
    </main>
  );
}

export default Main;
