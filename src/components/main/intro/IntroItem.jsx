import { Button } from 'react-bootstrap';
import MyModal from '../../modal/Modal';
import { useState } from 'react';
import ChangeIntro from './ChangeIntroIntro';

function IntroItem({ title, text, setIntro, leng }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  //   console.log(setIntro);

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
          <ChangeIntro setIntro={setIntro} text={text} len={leng} />
        </MyModal>
      )}
    </>
  );
}

export default IntroItem;
