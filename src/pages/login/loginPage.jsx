import clsx from 'clsx';
import css from './login.module.css';

import { useUser } from '../../components/context/user/userContext';
import { apiService, localStrageService } from '../../config';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { logIn } = useUser();
  const navigate = useNavigate();
  const year = new Date(Date.now()).getFullYear();

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;

    const { email, password } = form.elements;

    const token = await apiService.login(email.value, password.value);
    localStrageService.setAccsessToken(token);
    logIn();

    navigate('/', { replace: true });
  };

  return (
    <div className={css['form-page']}>
      <form className={css['form-signin']} onSubmit={handleSubmit}>
        <h1 className={clsx(css['color-h1'], 'h3 mb-3 fw-normal')}>Please sign in</h1>

        <div className="form-floating">
          <input type="email" className="form-control" id="email" placeholder="name@example.com" />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="password" placeholder="Password" />
          <label htmlFor="password">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2025-{year}</p>
      </form>
    </div>
  );
}

export default LoginPage;
