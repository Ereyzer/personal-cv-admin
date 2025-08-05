import { useMemo, useRef } from 'react';
import { notifications } from '../../../utils/notifications';
import { apiService } from '../../../config';
import { Form } from 'react-bootstrap';

const noteTitle = 'Saving About';

function ChangeAboutItem({ setAbout, onSave, text, len }) {
  const textareaRef = useRef();

  useMemo(() => {
    onSave(null, true, saving);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textareaRef]);

  async function saving() {
    if (textareaRef.current.value.length < 5 || textareaRef.current.value.length > 100) {
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
      <Form.Group>
        <Form.Control
          type="textarea"
          placeholder={text}
          minLength={5}
          maxLength={1000}
          ref={textareaRef}
        />
      </Form.Group>
    </>
  );
}

export default ChangeAboutItem;
