import { useEffect, useState } from 'react';
import { Button, Card, Form, ListGroup, Row } from 'react-bootstrap';
import { apiService } from '../../../config';

import clsx from 'clsx';
import css from './softSkill.module.css';
import MyModal from '../../modal/Modal';
import NewSoftSkill from './NewSoftSkill';
import { languages } from '../../../config/constants';
import UpdateSoftScill from './UpdateSoftSkill';
import { notifications } from '../../../utils/notifications';

function SoftSkillsList() {
  const [list, setList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [lang, setLang] = useState('en');

  const updateList = ({ _id, title, text }) => {
    setList(l => [
      ...l,
      {
        _id,
        title,
        text,
        langSupport: [...Object.keys(languages).map(l => ({ [l]: l === lang }))],
      },
    ]);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    (async () => {
      const res = await apiService.getSoftSkills(lang.toUpperCase());
      if (!res?.data) return [];

      const promises = res.data.map(({ _id, title, text }) => {
        return new Promise(onResolve => {
          return Promise.all(
            Object.keys(languages).map(l => {
              if (l === lang) {
                return { [l]: true };
              }
              return new Promise(onResolve => {
                apiService
                  .getSoftSkill(_id, l.toUpperCase())
                  .then(value => {
                    if (value.status === 404) return onResolve({ [l]: false });
                    return onResolve({ [l]: true });
                  })
                  .catch(() => {});
              });
            })
          ).then(value => {
            onResolve({ _id, title, text, langSupport: value });
          });
        });
      });
      setList(await Promise.all(promises));
    })();
  }, [lang]);

  const saveSkill = async skill => {
    const { data } = await apiService.addSoftSkill(lang, skill);
    updateList(data);
    closeModal();
  };

  const onDelete = async id => {
    try {
      notifications.info('DELETE soft skill', 'in process');
      await apiService.removeSoftSkill(id);

      notifications.info('DELETE soft skill', 'success');
      setList(l => [...l.filter(({ _id }) => _id !== id)]);
    } catch {
      notifications.info('DELETE soft skill', 'somesing went wrong');
    }
  };
  return (
    <section id="softSkills" className={clsx('main-section', 'inherit-colors')}>
      <h2>Soft Skills</h2>
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
          <Row xs={1} md={6} className={clsx(css.rowgap)}>
            {list.map(({ _id, title, text, langSupport }) => {
              const needAddLanguage = langSupport.filter(obj => {
                return !Object.values(obj)[0];
              });
              return (
                <Card
                  key={_id}
                  className={clsx(
                    'inherit-colors',
                    'text-center',
                    css.cardbg,
                    css.cardwidth,
                    css.cardheight
                  )}
                >
                  <Card.Body className={clsx(css.cardmargyn)}>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{text}</Card.Text>
                    <Button type="button" onClick={() => onDelete(_id)}>
                      Delete
                    </Button>
                    {needAddLanguage.length > 0 && (
                      <UpdateSoftScill needAddLanguage={needAddLanguage} _id={_id} />
                    )}
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
        <MyModal title={`Create ${languages[lang]} version Soft Skill`} onClose={closeModal}>
          <NewSoftSkill saveSkill={saveSkill} />
        </MyModal>
      )}
    </section>
  );
}

export default SoftSkillsList;
