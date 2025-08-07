import { useId, useMemo, useState } from 'react';
import { myDebounce } from '../../../utils/debounce';
import { Form } from 'react-bootstrap';

const memofunk = myDebounce((onSave, saving) => {
  onSave(null, true, saving);
}, 1000);

function NewSoftSkill({ onSave, saveSkill }) {
  const textId = useId();
  const titleId = useId();
  const [text, setText] = useState();
  const [title, setTitle] = useState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => memofunk(onSave, saving), [text, title]);

  function saving() {
    saveSkill({ text, title });
  }
  return (
    <>
      <Form.Label htmlFor={titleId}>Title</Form.Label>
      <Form.Control
        type="text"
        id={titleId}
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Form.Label htmlFor={textId}>Text</Form.Label>
      <Form.Control
        as="textarea"
        id={textId}
        value={text}
        onChange={e => setText(e.target.value)}
      />
    </>
  );
}

export default NewSoftSkill;
