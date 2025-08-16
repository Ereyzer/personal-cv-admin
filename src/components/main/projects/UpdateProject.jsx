import { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { apiService } from '../../../config';
import { languages } from '../../../config/constants';
import clsx from 'clsx';
import css from './index.module.css';

function UpdateProject({ data, onSave, updateData }) {
  const [skillList, setSkillLIst] = useState([]);
  const [skillChecked, setSkillChecked] = useState(data.technology);
  const [newData, setNewData] = useState({});
  const [lang, setLang] = useState('EN');

  const handleCheckboxClick = e => {
    const target = e.currentTarget;
    if (target.checked) {
      setSkillChecked(skills => [...skills, target.value]);
    }
    if (!target.checked) {
      setSkillChecked(skills => [...skills.filter(skill => skill !== target.value)]);
    }
  };

  useEffect(() => {
    onSave(null, true, () => {
      updateData(newData);
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData]);

  useEffect(() => {
    (async () => {
      const response = await apiService.getHardSkills();
      setSkillLIst([...response.data]);
    })();
  }, []);

  const onSubmitBase = async e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.set('technology', JSON.stringify(skillChecked));
    let formEntries = Object.fromEntries(formData.entries());
    if (formEntries.link.length < 1) formData.delete('link');
    if (formEntries.github.length < 1) formData.delete('github');

    const response = await apiService.updateProjectBase(formData, data._id);
    if (!response) return;
    setNewData(d => ({ ...d, ...response.data }));
  };

  const onSubmitText = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let formEntries = Object.fromEntries(formData.entries());
    if (formEntries.title.length < 1) formData.delete('title');
    if (formEntries.description.length < 1) formData.delete('description');
    formEntries = Object.fromEntries(formData.entries());
    if (!formEntries.title && !formEntries.description) return;

    const response = await apiService.updateProjectText({ ...formEntries }, data._id);
    if (!response) return;
    setNewData(d => ({ ...d, ...response.data }));
  };

  return (
    <>
      <Form onSubmit={onSubmitBase}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>{data.image.url ? 'update project image' : 'add project image'}</Form.Label>
          <Form.Control type="file" name="image" />
        </Form.Group>
        <Form.Group>
          {skillList.map(skill => {
            const isChecked = skillChecked.includes(skill._id);
            return (
              <Form.Check
                inline
                key={skill._id}
                name="technology"
                id={skill._id}
                label={skill.title}
                value={skill._id}
                onChange={handleCheckboxClick}
                checked={isChecked}
              />
            );
          })}
        </Form.Group>
        <Form.Group>
          <Form.Label>{data.link ? 'update link to project' : 'add link to project'}</Form.Label>
          <Form.Control type="url" name="link" />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            {data.link ? 'update link to project github' : 'add link to project github'}
          </Form.Label>
          <Form.Control type="url" name="github" />
        </Form.Group>
        <Button type="submit">save change</Button>
      </Form>
      <Form onSubmit={onSubmitText}>
        {' '}
        <Form.Select
          size="lg"
          className={clsx(css.selectwidth, css.selectposition, 'inherit-colors')}
          value={lang}
          onChange={e => setLang(e.target.value)}
          name="language"
        >
          {Object.keys(languages).map(key => {
            return (
              <option key={key} value={key.toUpperCase()}>
                {languages[key]}
              </option>
            );
          })}
        </Form.Select>
        <Form.Group>
          <Form.Label>{data.title ? 'update project titlt' : 'add  project title'}</Form.Label>
          <Form.Control type="text" name="title" placeholder={data.title} />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            {data.description ? 'update  project description' : 'add  project description'}
          </Form.Label>
          <Form.Control as="textarea" name="description" placeholder={data.description} />
        </Form.Group>
        <Button type="submit">save change</Button>
      </Form>
    </>
  );
}

export default UpdateProject;
