import css from './avatar.module.css';
import { useRef, useState } from 'react';
import AvatarModal from '../../modal/Modal';

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
    <section>
      <div className={css['hero-img']}>
        <img src={imgUrl} ref={imgRef} />
      </div>
      <button type="button" onClick={openModal}>
        {!imgUrl ? 'choose avatar' : 'change avatar'}
      </button>
      {isOpenModal && <AvatarModal title="New avatar" onClose={closeModal} setImgUrl={setImgUrl} />}
    </section>
  );
}

export default AvatarSection;
