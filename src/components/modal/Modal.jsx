import { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import css from './modal.module.css';
import { PhotoMovementHandlerClass } from './photoMovementHandlerClass';
import { apiService } from '../../config';

const minPhotoWidth = 202;

function AvatarModal({ onClose, setImgUrl }) {
  const [photo, setPhoto] = useState(null);
  const [photoEl, setPhotoEl] = useState(null);
  const [imageStyle, setImageStyle] = useState({
    top: 0,
    left: 0,
    width: minPhotoWidth,
    cursor: 'pointer',
  });
  const [notSlider, setNotSlider] = useState(0);

  const fileInput = useRef();
  const photoRef = useRef();
  const canvas = useRef();
  const { current: movementEventHendlerClass } = useRef(
    new PhotoMovementHandlerClass(
      imageStyle.left,
      imageStyle.top,
      updateImageStyle,
      photoRef,
      canvas
    )
  );

  function updateImageStyle(newObj) {
    setImageStyle(m => ({ ...m, ...newObj }));
  }

  useEffect(() => {
    const elem = fileInput.current;
    elem.addEventListener('change', () => {
      if (elem.files.length === 1) {
        setPhotoEl(elem.files[0]);
        setPhoto(URL.createObjectURL(elem.files[0]));

        setTimeout(() => {
          if (photoRef.current.naturalWidth > 0) {
            updateImageStyle({
              top: 0,
              left: 0,
              width: minPhotoWidth,
            });

            movementEventHendlerClass.setPhotoX(0);
            movementEventHendlerClass.setPhotoY(0);

            setNotSlider(minPhotoWidth);
          }
        });
      }
    });
  }, [movementEventHendlerClass]);

  const onSave = async () => {
    const fullImg = await apiService.updateFullAvatar(photoEl);
    const cutImg = await movementEventHendlerClass.cropPhoto();
    setImgUrl({
      avatar: {
        full: fullImg.data.url,
        cut: cutImg.data.url,
      },
    });
    onClose();
  };
  const onPhotoClick = e => {
    e.preventDefault();

    movementEventHendlerClass.setPrevX(e.clientX);
    movementEventHendlerClass.setPrevY(e.clientY);

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', movementEventHendlerClass.movementEvent);
      updateImageStyle({ cursor: 'pointer' });

      movementEventHendlerClass.setPhotoY();
      movementEventHendlerClass.setPhotoX();
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    updateImageStyle({ cursor: 'alias' });

    document.addEventListener('mousemove', movementEventHendlerClass.movementEvent);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Choose new avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formFile" className="mb-3">
          <div className={css['lable-position']}>
            <div className={css['hero-img']}>
              <canvas id="canvas" className={css['canvas-position']} ref={canvas}></canvas>
              <div className={css.overlay}></div>
              <img src={photo} onMouseDown={onPhotoClick} style={imageStyle} ref={photoRef} />
            </div>
          </div>

          {!!notSlider && (
            <Form.Range
              min={minPhotoWidth}
              max={photoRef.current.naturalWidth}
              value={notSlider}
              step={2}
              onChange={movementEventHendlerClass.scaleEven(setNotSlider)}
            />
          )}
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
