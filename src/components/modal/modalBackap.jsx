import { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form, Col, Image, Row } from 'react-bootstrap';
import clsx from 'clsx';

import css from './modal.module.css';

class MoveClickleHandle {
  #prevX;
  #prevY;
  #updateMoveCircle;
  #circleX;
  #circleY;
  #tmpCircleY;
  #tmpCircleX;
  constructor(x, y, updateMoveCircle, circleY, circleX) {
    this.#prevX = x;
    this.#prevY = y;
    this.#updateMoveCircle = updateMoveCircle;
    this.#circleX = circleX;
    this.#circleY = circleY;
  }

  getPrevX = () => this.#prevX;
  getPrevY = () => this.#prevY;
  setPrevX = x => {
    this.#prevX = x;
  };
  setPrevY = y => {
    this.#prevY = y;
  };
  setCircleY = () => {
    this.#circleY = this.#tmpCircleY;
  };
  setCircleX = () => {
    this.#circleX = this.#tmpCircleX;
  };

  movementEvent = e => {
    const { clientX, clientY } = e;

    const top = this.#circleY + (clientY - this.#prevY);
    const left = this.#circleX + (clientX - this.#prevX);

    this.#updateMoveCircle({ top, left });
    this.#tmpCircleY = top;
    this.#tmpCircleX = left;
  };
}

function AvatarModal({ onClose }) {
  const [photo, setPhoto] = useState(null);
  const [moveCircle, setMoveCircle] = useState({
    display: 'none',
    top: -250,
    left: 250,
    cursor: 'pointer',
  });

  const fileInput = useRef();
  const circleRef = useRef();
  const { current: movementEventHendlerClass } = useRef(
    new MoveClickleHandle(0, 0, updateMoveCircle, moveCircle.top, moveCircle.left)
  );
  function updateMoveCircle(newObj) {
    setMoveCircle(m => ({ ...m, ...newObj }));
  }

  const avatarBox = clsx(css.overlay);

  useEffect(() => {
    console.log('component did mount');
    console.log(fileInput);
    const elem = fileInput.current;
    elem.addEventListener('cancel', () => {
      console.log('Cancelled.');
    });
    elem.addEventListener('change', () => {
      if (elem.files.length === 1) {
        console.log('File selected: ', elem.files[0]);
        setPhoto(URL.createObjectURL(elem.files[0]));
        updateMoveCircle({ display: 'block' });
      }
    });
  }, []);
  const onSave = () => {
    console.log('save');
  };
  const onCircleClick = e => {
    movementEventHendlerClass.setPrevX(e.clientX);
    movementEventHendlerClass.setPrevY(e.clientY);
    console.log([circleRef.current.previousElementSibling]);
    //
    // offsetHeight 500
    // offsetLeft 79
    // offsetTop : 16
    // offsetWidth : 339

    const mouseUpHandler = e => {
      console.log(e.type);
      document.removeEventListener('mousemove', movementEventHendlerClass.movementEvent);
      updateMoveCircle({ cursor: 'pointer' });
      movementEventHendlerClass.setCircleY();
      movementEventHendlerClass.setCircleX();
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    updateMoveCircle({ cursor: 'alias' });
    if (e.target === circleRef.current) {
      document.addEventListener('mousemove', movementEventHendlerClass.movementEvent);
      document.addEventListener('mouseup', mouseUpHandler);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Choose new avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formFile" className="mb-3">
          <div className={css['lable-position']}>
            <div className={css['hero-img']} onMouseDown={onCircleClick}>
              <img src={photo} />
              <div className={avatarBox} style={moveCircle} ref={circleRef}></div>
            </div>
          </div>
          <Form.Control type="file" ref={fileInput} />
        </Form.Group>
      </Modal.Body>
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

export default AvatarModal;
