import { useId, useMemo, useState } from 'react';
import { Form, Image, InputGroup } from 'react-bootstrap';
import { isValidUrl } from '../../../utils/isValidUrl';
import css from './hardSkills.module.css';
import { myDebounce } from '../../../utils/debounce';

const memofunk = myDebounce((onSave, saving) => {
  onSave(null, true, saving);
}, 1000);

function NewHardSkill({ onSave, saveSkill }) {
  const [imgSrc, setImgSrc] = useState('');
  const [showImg, setShowImg] = useState(false);
  const [chekbox, setChekbox] = useState(false);
  const [text, setText] = useState('');
  const srcId = useId();
  const titleId = useId();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => memofunk(onSave, saving), [imgSrc, text]);

  console.log(chekbox);

  const handleSrcChange = e => {
    const { value } = e.target;
    setImgSrc(value);

    if (value.length < 15) {
      if (showImg) {
        setShowImg(false);
        setChekbox(false);
      }
      return;
    }
    if (!isValidUrl(value)) {
      if (showImg) {
        setShowImg(false);
        setChekbox(false);
      }
      return;
    }
    setShowImg(true);
  };

  const handleChekbox = e => {
    setChekbox(e.target.checked);
  };

  function saving() {
    saveSkill({ image: imgSrc, title: text });
  }

  return (
    <>
      {chekbox && (
        <div className={css.image}>
          <Image src={imgSrc} rounded />
        </div>
      )}
      <Form.Label htmlFor={srcId}>Image src</Form.Label>
      <InputGroup>
        <InputGroup.Checkbox
          aria-label="prewiev image chekbox"
          disabled={!showImg}
          checked={chekbox}
          onChange={handleChekbox}
        />
        <Form.Control
          type="url"
          id={srcId}
          value={imgSrc}
          onChange={handleSrcChange}
        ></Form.Control>
      </InputGroup>
      <Form.Label htmlFor={titleId}>Title</Form.Label>
      <Form.Control
        type="text"
        id={titleId}
        value={text}
        onChange={e => setText(e.target.value)}
      ></Form.Control>
    </>
  );
}

export default NewHardSkill;
