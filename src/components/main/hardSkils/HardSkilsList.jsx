import { useEffect, useState } from 'react';
import { Button, Card, CardGroup, ListGroup, Row } from 'react-bootstrap';
import { apiService } from '../../../config';

import clsx from 'clsx';
import css from './hardSkills.module.css';
import MyModal from '../../modal/Modal';
import NewHardSkill from './NewHardSkill';

function HardSkillsList() {
  const [list, setList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const updateList = ({ _id, title, image }) => {
    setList(l => [...l, { _id, title, image }]);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    (async () => {
      const res = await apiService.getHardSkills();
      if (!res?.data) return [];
      console.log(res);

      setList(res.data);
    })();
  }, []);

  const saveSkill = async skill => {
    // setList()
    const { data } = await apiService.addHardSkill(skill);
    updateList(data);
    closeModal();
  };

  const onDelete = async id => {
    apiService.removeHardSkill(id);
  };
  return (
    <section id="hardSkills" className={clsx('main-section', 'inherit-colors')}>
      <h2>Hard Skills</h2>

      <ListGroup>
        <ListGroup.Item className="inherit-colors">
          <Row xs={1} md={6}>
            {list.map(({ _id, title, image }) => {
              return (
                <Card key={_id} className="inherit-colors text-center">
                  <Card.Body className={css.cardm}>
                    <Card.Img variant="top" src={image} />
                    <Card.Title>{title}</Card.Title>
                    <Button type="button" onClick={() => onDelete(_id)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
        </ListGroup.Item>
      </ListGroup>
      <Button variant="primary" onClick={openModal}>
        Create Skill
      </Button>
      {isOpenModal && (
        <MyModal title="Create new Hard Skill" onClose={closeModal}>
          <NewHardSkill saveSkill={saveSkill} />
        </MyModal>
      )}
    </section>
  );
}

export default HardSkillsList;
