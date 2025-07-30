import { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import css from './modal.module.css';
import { PhotoMovementHandlerClass } from './photoMovementHandlerClass';

const minPhotoWidth = 202;

function AvatarModal({ onClose }) {
  const [photo, setPhoto] = useState(null);
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
      canvas,
      setPhoto
    )
  );

  function updateImageStyle(newObj) {
    setImageStyle(m => ({ ...m, ...newObj }));
  }

  useEffect(() => {
    const elem = fileInput.current;
    elem.addEventListener('change', () => {
      if (elem.files.length === 1) {
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
            console.log([photoRef.current]);

            setNotSlider(minPhotoWidth);
          }
        });
      }
    });
  }, [movementEventHendlerClass]);

  // useEffect(() => {
  //   console.log('original width: ', [photoRef.current]);
  //   setTimeout(() => {
  //     if (photoRef.current.naturalWidth > 0) {
  //       setNotSlider(minPhotoWidth);
  //     }
  //   });
  // }, [photo]);
  const onSave = () => {
    console.log('save');
    movementEventHendlerClass.cropPhoto();
  };
  const onPhotoClick = e => {
    e.preventDefault();
    console.log([photoRef.current]);
    // console.log('height: ', 100 - (e.target.clientHeight - 200));
    // console.log('width: ', e.target.clientWidth);
    // console.log('offH: ', e.target.offsetHeight);
    // console.log('offW: ', e.target.offsetWidth);
    // console.log('top: ', photoRef.current.offsetTop);
    // console.log('left: ', e.target.offsetLeft);
    // console.log('offset: ', 100 - Number.parseInt((photoRef.current.offsetWidth - 200) / 2));
    console.log([e.target]);
    console.log(e.clientX);

    movementEventHendlerClass.setPrevX(e.clientX);
    movementEventHendlerClass.setPrevY(e.clientY);

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', movementEventHendlerClass.movementEvent);
      updateImageStyle({ cursor: 'pointer' });
      console.log('mouse Up');

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
