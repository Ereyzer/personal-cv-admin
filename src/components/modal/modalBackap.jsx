// // import { useEffect, useRef, useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// // import css from './modal.module.css';
// import { PhotoMovementHandlerClass } from './photoMovementHandlerClass';
// // import { apiService } from '../../config';
// // import { notifications } from '../../utils/notifications';

// // const minPhotoWidth = 202;

// function AvatarModal({ onClose, setImgUrl, children }) {
//   // const [photo, setPhoto] = useState(null);
//   // const [photoEl, setPhotoEl] = useState(null);
//   // const [imageStyle, setImageStyle] = useState({
//   //   top: 0,
//   //   left: 0,
//   //   width: minPhotoWidth,
//   //   cursor: 'pointer',
//   // });
//   // const [minSliderValue, setMinSliderValue] = useState(0);
//   // const [maxSliderValue, setMaxSliderValue] = useState(0);

//   // const fileInput = useRef();
//   // const photoRef = useRef();
//   // const canvas = useRef();
//   // const { current: movementEventHendlerClass } = useRef(
//   //   new PhotoMovementHandlerClass(
//   //     imageStyle.left,
//   //     imageStyle.top,
//   //     updateImageStyle,
//   //     photoRef,
//   //     canvas
//   //   )
//   // );

//   // function updateImageStyle(newObj) {
//   //   setImageStyle(m => ({ ...m, ...newObj }));
//   // }

//   // useEffect(() => {
//   //   const element = fileInput.current;
//   //   element.addEventListener('change', e => {
//   //     const elem = e.target;
//   //     if (elem.files.length === 1) {
//   //       setPhotoEl(elem.files[0]);
//   //       setPhoto(URL.createObjectURL(elem.files[0]));

//   //       updateImageStyle({
//   //         top: 0,
//   //         left: 0,
//   //         width: minPhotoWidth,
//   //       });
//   //     }
//   //   });
//   // }, [movementEventHendlerClass]);

//   // const handleImgOnLoad = () => {
//   //   movementEventHendlerClass.setTopLefrStart();
//   //   movementEventHendlerClass.setPhotoX(0);
//   //   movementEventHendlerClass.setPhotoY(0);
//   //   setMinSliderValue(minPhotoWidth);
//   //   setMaxSliderValue(photoRef.current.naturalWidth);
//   // };
//   const onSave = ((isApdated = false) => {
//     // let isApdated = false;
//     console.log(isApdated);
//     return async (e, apdate, func) => {
//       if (!e && !!apdate) {
//         isApdated = apdate;
//       }
//       if (!isApdated) {
//         onClose();
//         return;
//       } else {
//         func();
//         onClose();
//       }
//     };
//   })(false);
//   // const onSave = async () => {
//   // new Promise((onResolve, onReject) => {
//   //   const fullImg = apiService.updateFullAvatar(photoEl);
//   //   const cutImg = movementEventHendlerClass.cropPhoto();
//   //   notifications.info('Saving avstar', 'we updating your avatar');
//   //   Promise.all([fullImg, cutImg])
//   //     .then(([full, cut]) => {
//   //       setImgUrl({
//   //         avatar: {
//   //           full: full.data.url,
//   //           cut: cut.data.url,
//   //         },
//   //       });
//   //     })
//   //     .catch(e => {
//   //       onReject(e.message);
//   //     });
//   //   onResolve();
//   // })
//   //   .then(() => {
//   //     notifications.success('Saving avstar', 'Avatar was updated!');
//   //   })
//   //   .catch(message => {
//   //     notifications.error('Saving avstar', message);
//   //   });
//   // onClose();
//   // };
//   // const onPhotoClick = e => {
//   //   e.preventDefault();

//   //   movementEventHendlerClass.setPrevX(e.clientX);
//   //   movementEventHendlerClass.setPrevY(e.clientY);

//   //   const mouseUpHandler = () => {
//   //     document.removeEventListener('mousemove', movementEventHendlerClass.movementEvent);
//   //     updateImageStyle({ cursor: 'pointer' });

//   //     movementEventHendlerClass.setPhotoY();
//   //     movementEventHendlerClass.setPhotoX();
//   //     document.removeEventListener('mouseup', mouseUpHandler);
//   //   };
//   //   updateImageStyle({ cursor: 'alias' });

//   //   document.addEventListener('mousemove', movementEventHendlerClass.movementEvent);
//   //   document.addEventListener('mouseup', mouseUpHandler);
//   // };

//   return (
//     <Modal show={true} onHide={onClose} animation={true}>
//       <Modal.Header closeButton>
//         <Modal.Title>Choose new avatar</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>{children}</Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={onSave}>
//           Save Changes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default AvatarModal;

import { Modal, Button } from 'react-bootstrap';

function MyModal({ onClose, children }) {
  const onSave = ((isApdated = false) => {
    // let isApdated = false;
    console.log(isApdated);
    return async (e, apdate, func) => {
      if (!e && !!apdate) {
        isApdated = apdate;
      }
      if (!isApdated) {
        onClose();
        return;
      } else {
        func();
        onClose();
      }
    };
  })(false);
  return (
    <Modal show={true} onHide={onClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Choose new avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
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
