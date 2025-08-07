import { ListGroup } from 'react-bootstrap';
import LinkItem from './linkItem/LInkItem';

function LinksSection({ data, patchData }) {
  return (
    <section id="social-links" className="main-section">
      <h3>Social links</h3>
      <ListGroup>
        <ListGroup.Item className="inherit-colors">
          <LinkItem
            linkName={'contact_email'}
            data={data}
            patchData={patchData}
            placeholder={'youraddress@email.com'}
            type={'email'}
          />
          <LinkItem
            linkName={'linkedin'}
            data={data}
            patchData={patchData}
            placeholder={'yourlinkedin link'}
            type={'url'}
          />
          <LinkItem
            linkName={'github'}
            data={data}
            patchData={patchData}
            placeholder={'github link'}
            type={'url'}
          />
          <LinkItem
            linkName={'facebook'}
            data={data}
            patchData={patchData}
            placeholder={'facebook link'}
            type={'url'}
          />
          <LinkItem
            linkName={'instagram'}
            data={data}
            patchData={patchData}
            placeholder={'instagram link'}
            type={'url'}
          />
          <LinkItem
            linkName={'phone'}
            data={data}
            patchData={patchData}
            placeholder={'+380660384627'}
            type={'tel'}
          />
        </ListGroup.Item>
      </ListGroup>
    </section>
  );
}

export default LinksSection;
