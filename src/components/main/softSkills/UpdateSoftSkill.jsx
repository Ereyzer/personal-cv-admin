import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { languages } from '../../../config/constants';
import MyModal from '../../modal/Modal';
import { apiService } from '../../../config';
import NewSoftSkill from './NewSoftSkill';

function UpdateSoftScill({ needAddLanguage, _id }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [lang] = useState(Object.keys(needAddLanguage[0])[0]);

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  const saveSkill = async skill => {
    const { data } = await apiService.addSoftSkill(lang, { ...skill, _id });
    console.log(data);

    closeModal();
  };

  return (
    <>
      <Button onClick={openModal}>add {languages[lang]}</Button>
      {isOpenModal && (
        <MyModal title={`Create ${languages[lang]} version Soft Skill`} onClose={closeModal}>
          <NewSoftSkill saveSkill={saveSkill} />
        </MyModal>
      )}
    </>
  );
}

export default UpdateSoftScill;
