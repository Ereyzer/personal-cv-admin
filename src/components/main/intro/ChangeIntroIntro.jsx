import { useMemo, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { apiService } from '../../../config';
import { notifications } from '../../../utils/notifications';

const noteTitle = 'Saving Intro';
function ChangeIntro({ setIntro, onSave, text, len }) {
  const textareaRef = useRef();
  useMemo(() => {
    onSave(null, true, saving);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textareaRef]);

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
      <Form.Group>
        <Form.Control
          type="textarea"
          placeholder={text}
          minLength={5}
          maxLength={100}
          ref={textareaRef}
        />
      </Form.Group>
    </>
  );
}

export default ChangeIntro;
