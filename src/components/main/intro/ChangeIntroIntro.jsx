import { useMemo, useRef, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { apiService } from '../../../config';
import { notifications } from '../../../utils/notifications';

const noteTitle = 'Saving Intro';
function ChangeIntro({ setIntro, onSave, text, len }) {
  const textareaRef = useRef();
  useMemo(() => {
    onSave(null, true, saving);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textareaRef]);
  const [textValue, setTextValue] = useState(text);
  const handleChange = e => {
    setTextValue(e.target.value);
  };
  const clearText = () => {
    setTextValue('');
  };
  async function saving() {
    if (textareaRef.current.value.length < 5 || textareaRef.current.value.length > 100) {
      notifications.error(noteTitle, 'text must be min length 5 and max length 100');
      return false;
    }

    apiService
      .updateIntro(textareaRef.current.value, len)
      .then(resp => {
        const { intro } = resp.data;
        setIntro({ intro });
        notifications.success(noteTitle, 'success');
      })
      .catch(() => {
        notifications.error(noteTitle, 'somsing went wrong please try again');
      });
    notifications.info(noteTitle, 'now in process');

    return true;
  }
  return (
    <>
      <InputGroup>
        <Form.Control
          as="textarea"
          placeholder="Say some intro about you"
          value={textValue}
          minLength={5}
          maxLength={250}
          ref={textareaRef}
          onChange={handleChange}
          rows={6}
        />
        <Button variant="outline-secondary" onClick={clearText}>
          Clear
        </Button>
      </InputGroup>
    </>
  );
}

export default ChangeIntro;
