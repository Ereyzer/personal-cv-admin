import { useEffect, useMemo, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';

import css from './modal.module.css';
import { PhotoMovementHandlerClass } from './photoMovementHandlerClass';
import { apiService } from '../../../config';
import { notifications } from '../../../utils/notifications.js';

const minPhotoWidth = 202;

function ChangeAvatarModalBody({ setImgUrl, onSave }) {
  const [photo, setPhoto] = useState(null);
  const [photoEl, setPhotoEl] = useState({ value: null });
  const [imageStyle, setImageStyle] = useState({
    top: 0,
    left: 0,
    width: minPhotoWidth,
    cursor: 'pointer',
  });
  const [minSliderValue, setMinSliderValue] = useState(0);
  const [maxSliderValue, setMaxSliderValue] = useState(0);

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
  function updatePhotoEl(newPhotoEl) {
    console.log(newPhotoEl);

    setPhotoEl(m => ({ ...m, ...{ value: newPhotoEl } }));
  }
  useEffect(() => {
    const element = fileInput.current;
    element.addEventListener('change', e => {
      const elem = e.target;
      if (elem.files.length === 1) {
        updatePhotoEl(elem.files[0]);
        setPhoto(URL.createObjectURL(elem.files[0]));

        updateImageStyle({
          top: 0,
          left: 0,
          width: minPhotoWidth,
        });
      }
    });
  }, [movementEventHendlerClass]);
  useEffect(() => {}, [photoEl]);

  useMemo(() => {
    onSave(null, true, saving);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoEl]);

  const handleImgOnLoad = () => {
    movementEventHendlerClass.setTopLefrStart();
    movementEventHendlerClass.setPhotoX(0);
    movementEventHendlerClass.setPhotoY(0);
    setMinSliderValue(minPhotoWidth);
    setMaxSliderValue(photoRef.current.naturalWidth);
  };

  async function saving() {
    if (!photoEl.value) return false;
    new Promise((onResolve, onReject) => {
      const fullImg = apiService.updateFullAvatar(photoEl.value);
      const cutImg = movementEventHendlerClass.cropPhoto();
      notifications.info('Saving avstar', 'we updating your avatar');
      Promise.all([fullImg, cutImg])
        .then(([full, cut]) => {
          setImgUrl({
            avatar: {
              full: full.data.url,
              cut: cut.data.url,
            },
          });
        })
        .catch(e => {
          onReject(e.message);
        });
      onResolve();
    })
      .then(() => {
        notifications.success('Saving avstar', 'Avatar was updated!');
      })
      .catch(message => {
        notifications.error('Saving avstar', message);
      });
    return true;
  }
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
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <div className={css['lable-position']}>
          <div className={css['hero-img']}>
            <canvas id="canvas" className={css['canvas-position']} ref={canvas}></canvas>
            <div className={css.overlay}></div>
            {!!photo && (
              <img
                src={photo}
                onMouseDown={onPhotoClick}
                style={imageStyle}
                ref={photoRef}
                onLoad={handleImgOnLoad}
              />
            )}
          </div>
        </div>

        {!!minSliderValue && !!maxSliderValue && (
          <Form.Range
            min={minPhotoWidth}
            max={maxSliderValue}
            value={minSliderValue}
            step={2}
            onChange={movementEventHendlerClass.scaleEven(setMinSliderValue)}
          />
        )}
        <Form.Control type="file" ref={fileInput} />
      </Form.Group>
    </>
  );
}

export default ChangeAvatarModalBody;
