import { useEffect, useState } from 'react';
import { apiService } from '../../../config/index';
import { Table } from 'react-bootstrap';

function StatisticsSection() {
  const [ukr, setUkr] = useState(null);
  const [eng, setEng] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await apiService.getStat();
      setUkr(() => {
        return {
          ...response.data.filter(({ _id }) => _id.toUpperCase() === 'UK')[0],
        };
      });
      setEng(() => {
        return {
          ...response.data.filter(({ _id }) => _id.toUpperCase() === 'EN')[0],
        };
      });
    })();
  }, []);

  if (!ukr && !eng) {
    return <main>Clear statistic!</main>;
  }

  const allLinksClick = obj => {
    const goodArr = ['openlinkedin', 'openfacebook', 'openinstagram', 'opengithub', 'opentelegram'];
    let count = 0;
    const list = Object.keys(obj).filter(key => goodArr.includes(key));
    list.forEach(key => {
      count += obj[key];
    });
    return count;
  };

  return (
    <main>
      <h1>Statistics of my resume</h1>
      <Table>
        <thead>
          <tr>
            <th>language</th>
            <th>Ukrainian</th>
            <th>English</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>opened</th>
            <th>{ukr.opened}</th>
            <th>{eng.opened}</th>
            <th>{ukr.opened + eng.opened}</th>
          </tr>
          <tr>
            <th>send email</th>
            <th>{ukr.sendemail}</th>
            <th>{eng.sendemail}</th>
            <th>{ukr.sendemail + eng.sendemail}</th>
          </tr>
          <tr>
            <th>open github</th>
            <th>{ukr.opengithub}</th>
            <th>{eng.opengithub}</th>
            <th>{ukr.opengithub + eng.opengithub}</th>
          </tr>
          <tr>
            <th>open linkedin</th>
            <th>{ukr.openlinkedin}</th>
            <th>{eng.openlinkedin}</th>
            <th>{ukr.openlinkedin + eng.openlinkedin}</th>
          </tr>
          <tr>
            <th>open facebook</th>
            <th>{ukr.openfacebook}</th>
            <th>{eng.openfacebook}</th>
            <th>{ukr.openfacebook + eng.openfacebook}</th>
          </tr>
          <tr>
            <th>open instagram</th>
            <th>{ukr.openinstagram}</th>
            <th>{eng.openinstagram}</th>
            <th>{ukr.openinstagram + eng.openinstagram}</th>
          </tr>
          <tr>
            <th>open telegram</th>
            <th>{ukr.opentelegram}</th>
            <th>{eng.opentelegram}</th>
            <th>{ukr.opentelegram + eng.opentelegram}</th>
          </tr>
          <tr>
            <th>download resume</th>
            <th>{ukr.downloadresume}</th>
            <th>{eng.downloadresume}</th>
            <th>{ukr.downloadresume + eng.downloadresume || 0}</th>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>open links total</th>
            <th>{allLinksClick(ukr)}</th>
            <th>{allLinksClick(eng)}</th>
            <th>{allLinksClick(ukr) + allLinksClick(eng)}</th>
          </tr>
        </tfoot>
      </Table>
    </main>
  );
}

export default StatisticsSection;
