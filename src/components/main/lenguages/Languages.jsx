import { ListGroup } from 'react-bootstrap';
import { constants } from '../../../config';

function LangugeList({ obj, TextComponent, ...props }) {
  return <ListGroup>{buildLangList({ obj, TextComponent }, props)}</ListGroup>;
}

export default LangugeList;

function buildLangList(obj, props) {
  return (
    <>
      {Object.keys(obj.obj).map(key => {
        return (
          <ListGroup.Item className="inherit-colors" key={key}>
            <obj.TextComponent
              title={constants.languages[key]}
              text={obj.obj[key]}
              {...props}
              leng={key}
            />
          </ListGroup.Item>
        );
      })}
    </>
  );
}
