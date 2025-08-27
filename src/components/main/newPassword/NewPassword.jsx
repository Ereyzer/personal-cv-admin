import { Button } from 'react-bootstrap';
import { apiService } from '../../../config';
import { notifications } from '../../../utils/notifications';

function NewPassword() {
  const onClick = () => {
    const isShure = confirm('Are you shure');
    if (!isShure) return;
    apiService
      .updatePassword()
      .then(() => {
        notifications.success('check your email');
      })
      .catch(e => notifications.error(e.message));
  };
  return (
    <>
      <Button onClick={onClick}>Update Password</Button>
    </>
  );
}

export default NewPassword;
