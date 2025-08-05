import { useMemo, useRef, useState } from 'react';
import { notifications } from '../../../utils/notifications';
import { apiService } from '../../../config';
import { Button, Form, InputGroup } from 'react-bootstrap';

const noteTitle = 'Saving About';

function ChangeAboutItem({ setAbout, onSave, text, len }) {
  const textareaRef = useRef();
  const [textValue, setTextValue] = useState(text);
  const handleChange = e => {
    setTextValue(e.target.value);
  };
  const clearText = () => {
    setTextValue('');
  };

  useMemo(() => {
    onSave(null, true, saving);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textareaRef]);

  async function saving() {
    if (textareaRef.current.value.length < 5 || textareaRef.current.value.length > 1000) {
      notifications.error(noteTitle, 'text must be min length 5 and max length 1000');
      return false;
    }

    apiService
      .updateAbout(textareaRef.current.value, len)
      .then(resp => {
        const { about } = resp.data;
        setAbout({ about });
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
          placeholder="Say somesing about you"
          minLength={5}
          maxLength={1000}
          value={textValue}
          ref={textareaRef}
          onChange={handleChange}
          rows={14}
        />
        <Button variant="outline-secondary" onClick={clearText}>
          Clear
        </Button>
      </InputGroup>
    </>
  );
}

export default ChangeAboutItem;
