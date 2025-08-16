import { useEffect, useRef, useState } from 'react';
import { apiService } from '../../../config';
import { Form } from 'react-bootstrap';

function CreateNewProject({ onSave, addItem }) {
  const [skillList, setSkillLIst] = useState([]);
  const [skillChecked, setSkillChecked] = useState([]);
  const formRef = useRef();

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
    (async () => {
      const response = await apiService.getHardSkills();
      setSkillLIst([...response.data]);
    })();
  }, []);

  useEffect(() => {
    onSave(null, true, async () => {
      formRef.current.requestSubmit();
    });
  }, [formRef, onSave]);

  const onSubmitBase = async e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.set('technology', JSON.stringify(skillChecked));
    let formEntries = Object.fromEntries(formData.entries());
    if (formEntries.link.length < 1) formData.delete('link');
    if (formEntries.github.length < 1) formData.delete('github');

    const response = await apiService.addProject(formData);
    if (!response) return;

    addItem({ ...response.data });
  };

  return (
    <>
      <Form onSubmit={onSubmitBase} ref={formRef}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>add project image</Form.Label>
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
          <Form.Label>add link to project</Form.Label>
          <Form.Control type="url" name="link" placeholder="link url" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>add link to project github</Form.Label>
          <Form.Control type="url" name="github" placeholder="github url" />
        </Form.Group>
      </Form>
    </>
  );
}

export default CreateNewProject;
