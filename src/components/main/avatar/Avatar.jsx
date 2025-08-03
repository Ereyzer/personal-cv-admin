import css from './avatar.module.css';
import { useRef, useState } from 'react';
import AvatarModal from '../../modal/Modal';
import { Button } from 'react-bootstrap';
import ChangeAvatarModalBody from './ChangeAvaterModalBody';

function AvatarSection({ imgUrl, setImgUrl }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const imgRef = useRef();
  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  return (
    <section id="avatar">
      <div className={css['hero-img']}>
        <img src={imgUrl} ref={imgRef} />
      </div>
      <Button type="button" onClick={openModal}>
        {!imgUrl ? 'choose avatar' : 'change avatar'}
      </Button>
      {isOpenModal && (
        <AvatarModal title="Choose new avatar" onClose={closeModal} setImgUrl={setImgUrl}>
          <ChangeAvatarModalBody setImgUrl={setImgUrl} />
        </AvatarModal>
      )}
    </section>
  );
}

export default AvatarSection;
