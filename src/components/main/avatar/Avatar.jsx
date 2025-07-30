import css from './avatar.module.css';
import { useState } from 'react';
import AvatarModal from '../../modal/Modal';

function AvatarSection({ imgUrl }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  return (
    <section>
      <div className={css['hero-img']}>
        <img src={imgUrl} />
      </div>
      <button type="button" onClick={openModal}>
        {!imgUrl ? 'choose avatar' : 'change avatar'}
      </button>
      {isOpenModal && <AvatarModal title="New avatar" onClose={closeModal} />}
    </section>
  );
}

export default AvatarSection;
