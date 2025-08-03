import { ListGroup } from 'react-bootstrap';
import { langs } from '../../../config/constants';

function LangugeList({ obj, TextComponent, ...props }) {
  return <ListGroup>{buildLangList({ obj, TextComponent }, props)}</ListGroup>;
}

export default LangugeList;

function buildLangList(obj, props) {
  return (
    <>
      {Object.keys(obj.obj).map(key => {
        return (
          <ListGroup.Item style={{ backgroundColor: 'inherit', color: 'inherit' }} key={key}>
            <obj.TextComponent title={langs[key]} text={obj.obj[key]} {...props} leng={key} />
          </ListGroup.Item>
        );
      })}
    </>
  );
}
