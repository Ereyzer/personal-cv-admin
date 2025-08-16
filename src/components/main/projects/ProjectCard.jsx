import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import css from './index.module.css';
import clsx from 'clsx';
import MyModal from '../../modal/Modal';
import UpdateProject from './UpdateProject';
import { apiService } from '../../../config';

function ProjectCard({ data, updateData, deleteItem }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [technology, setTechnology] = useState([]);

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (data.technology.length < 1) {
      setTechnology([]);
      return;
    }
    (async () => {
      const response = await apiService.getHardSkillsByIds(data.technology);
      setTechnology([...response.data.map(({ title }) => title)]);
    })();
  }, [data.technology]);

  const onDelete = async () => {
    const response = await apiService.deleteProject(data._id);
    if (!response) return;
    deleteItem(data._id);
  };

  return (
    <>
      <Card
        className={clsx('inherit-colors', 'text-center', css.cardbg, css.cardwidth, css.cardheight)}
      >
        <Card.Body>
          <Card.Img src={data.image?.url || './src/assets/def.jpeg'}></Card.Img>
          <Card.Title>{data.title || 'Project name'}</Card.Title>
          <Card.Text>{data.description || 'Description of the Project'}</Card.Text>
          <h5>Technology</h5>
          <Card.Text>{technology.join(', ')}</Card.Text>
          <Card.Link href={data.link} target="_blank">
            link to project
          </Card.Link>
          <Card.Link href={data.github} target="_blank">
            link to github
          </Card.Link>
        </Card.Body>

        <Button onClick={openModal}>update card</Button>
        <Button variant="danger" onClick={onDelete}>
          delete
        </Button>
      </Card>
      {isOpenModal && (
        <MyModal title={'update Project'} onClose={closeModal}>
          <UpdateProject data={data} updateData={updateData} />
        </MyModal>
      )}
    </>
  );
}

export default ProjectCard;
