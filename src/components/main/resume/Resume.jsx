import { useEffect, useState } from 'react';
import { apiService } from '../../../config';
import { Button, Form, InputGroup } from 'react-bootstrap';

import css from './resume.module.css';
import clsx from 'clsx';
import { notifications } from '../../../utils/notifications';

function Resume() {
  const [fileResume, setFileResume] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [filename, setFileName] = useState('resume.pdf');
  const [viewResume, setViewResume] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const url = await apiService.getResume();
        setFileUrl(url.fileURL);
        setFileName(url.originalFileName);
      } catch {
        return;
      }
    })();
  }, []);

  const choseFile = e => {
    const file = e.target.files[0];
    setFileResume(file);
  };
  const onSend = async () => {
    const response = await apiService.updateResume(fileResume);

    if (response.status === 201) {
      setFileUrl(URL.createObjectURL(fileResume));
      setFileName(fileResume.name);
    }
  };

  const onDelete = async () => {
    const deleteTitle = 'Delete Resume';
    try {
      await apiService.deleteResume();
      setFileResume(null);
      setFileUrl(null);
      setFileName(null);
      notifications.success(deleteTitle, 'resume delete');
    } catch {
      notifications.error(deleteTitle, 'somesing went wrong');
    }
  };

  return (
    <>
      <section id="resume" className={clsx(css.resumeflex, 'main-section')}>
        <h2>Resume</h2>

        {fileUrl && (
          <div>
            <Button onClick={() => setViewResume(v => !v)}>View Resume</Button>
            <Button onClick={onDelete}>Delete resume</Button>
            <Button variant="link" download={filename} href={fileUrl}>
              download resume
            </Button>
          </div>
        )}
        {fileUrl && viewResume && (
          <iframe
            title="PDF Viewer"
            src={fileUrl}
            width="100%"
            height="600px"
            style={{ border: 'none' }}
          />
        )}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>{!fileUrl ? 'add new' : 'Update'} resume</Form.Label>
          <InputGroup>
            <Form.Control type="file" onChange={choseFile} accept=".pdf" />
            {!!fileResume && <Button onClick={onSend}>Send file</Button>}
          </InputGroup>
        </Form.Group>
      </section>
    </>
  );
}

export default Resume;
