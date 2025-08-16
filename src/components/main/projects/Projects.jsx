import { useEffect, useState } from 'react';
import { Button, Form, ListGroup, Row } from 'react-bootstrap';
import { apiService } from '../../../config';
import clsx from 'clsx';
import { languages } from '../../../config/constants';
import css from './index.module.css';
import ProjectCard from './ProjectCard';
import MyModal from '../../modal/Modal';
import CreateNewProject from './CreateNewProject';

function Projects() {
  const [list, setList] = useState([]);
  const [lang, setLang] = useState('en');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  const updateOneItem = item => {
    setList(old =>
      old.map(obj => {
        if (obj._id !== item._id) return obj;
        return { ...obj, ...item };
      })
    );
  };
  const removeItem = id => {
    setList(old => old.filter(obj => obj._id !== id));
  };

  const addItem = item => {
    setList(old => [...old, item]);
  };
  useEffect(() => {
    (async () => {
      const response = await apiService.getProjectList(lang);
      setList(response.data);
    })();
  }, [lang]);

  return (
    <section id="projects" className={clsx('main-section', 'inherit-colors')}>
      <h2>Projects</h2>
      <Form.Select
        size="lg"
        className={clsx(css.selectwidth, css.selectposition, 'inherit-colors')}
        value={lang}
        onChange={e => setLang(e.target.value)}
      >
        {Object.keys(languages).map(key => {
          return (
            <option key={key} value={key} className={css.optionstyle}>
              {languages[key]}
            </option>
          );
        })}
      </Form.Select>
      <ListGroup>
        <ListGroup.Item className="inherit-colors">
          <Row xs={1} md={3}>
            {list.map(item => {
              console.log(item);
              return (
                <ProjectCard
                  key={item._id}
                  data={item}
                  updateData={updateOneItem}
                  deleteItem={removeItem}
                />
              );
            })}
          </Row>
        </ListGroup.Item>
      </ListGroup>
      <Button onClick={openModal}>Add project</Button>
      {isOpenModal && (
        <MyModal onClose={closeModal} title={'Add new Project'}>
          <CreateNewProject addItem={addItem} />
        </MyModal>
      )}
    </section>
  );
}

export default Projects;
