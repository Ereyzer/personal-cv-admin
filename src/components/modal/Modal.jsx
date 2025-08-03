import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function MyModal({ title, onClose, children }) {
  const onSave = ((isApdated = false, myFunc = null) => {
    return async (e, apdate, func) => {
      if (!e && !!apdate) {
        isApdated = apdate;
        myFunc = func;
        return;
      }
      if (!isApdated) {
        onClose();
        return;
      } else {
        if (!(await myFunc())) {
          return;
        }
        onClose();
      }
    };
  })();
  if (React.Children.count(children) === 0) {
    return (
      <Modal show={true} onHide={onClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>here is no content</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const childWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { onSave })
  );

  return (
    <Modal show={true} onHide={onClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{childWithProps}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
