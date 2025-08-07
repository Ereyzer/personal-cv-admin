import { useState } from 'react';
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import clsx from 'clsx';

import css from './linkItem.module.css';
import { apiService } from '../../../../config';
import { notifications } from '../../../../utils/notifications';

function LinkItem({ linkName, data, patchData, type, placeholder }) {
  const [value, setValue] = useState(data[linkName] || '');
  const saveDataVersion = () => {
    patchData({ [linkName]: value });
  };
  const handleChange = e => {
    setValue(e.target.value);
  };
  const onSave = () => {
    const noteTitle = `Update ${linkName}`;
    notifications.info(noteTitle, `Updating... ${linkName}`);

    apiService
      .updatSocialLinks(linkName, value)
      .then(res => {
        if (!res) return;
        saveDataVersion();
        notifications.success(noteTitle, `${linkName} was updated`);
      })
      .catch(() => {
        notifications.error(noteTitle, 'try again');
      });
  };

  const onDelete = () => {
    const noteTitle = `Removing ${linkName}`;
    notifications.info(noteTitle, 'sending request');
    apiService
      .removeSocialLink(linkName)
      .then(res => {
        if (!res) return new Error();
        setValue('');
        patchData({ [linkName]: null });
        notifications.success(noteTitle, `${linkName} was delete`);
      })
      .catch(() => {
        notifications.error(noteTitle, 'try again');
      });
  };
  return (
    <InputGroup className={clsx('mb-3', css.width)}>
      <InputGroup.Text className="inherit-colors">{linkName}</InputGroup.Text>
      <Form.Control
        className={clsx('inherit-colors')}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        type={type}
      ></Form.Control>
      <Button type="button" onClick={onSave}>
        Sabmit
      </Button>
      <Button variant="danger" onClick={onDelete}>
        Delete
      </Button>
    </InputGroup>
  );
}

export default LinkItem;
