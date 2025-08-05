import { useState } from 'react';
import { Button } from 'react-bootstrap';
import MyModal from '../../modal/Modal';
import ChangeAboutItem from './ChangeAboutItem';

function AboutItem({ title, text, patchData, leng }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <h3>{title} version of intro section</h3>
      <p>{text}</p>
      <Button onClick={openModal}>Change intro</Button>
      {isOpenModal && (
        <MyModal title={`Update ${title} version of intro`} onClose={closeModal}>
          <ChangeAboutItem setAbout={patchData} text={text} len={leng} />
        </MyModal>
      )}
    </>
  );
}

export default AboutItem;
