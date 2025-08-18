import { Container, NavLink } from 'react-bootstrap';
import SvgLogo from '../svgs/SvgLogo';
import { useUser } from '../context/user/userContext';
import css from './index.module.css';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const { logOut } = useUser();
  const location = useLocation();

  return (
    <header className="p-3 bg-dark text-white">
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between">
          <SvgLogo width={33} height={33} />
          <nav className={css['nav-container']}>
            <Link to="/">Data</Link>
            <Link to="/stat">Stat</Link>
          </nav>
          {location.pathname === '/' && (
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input
                type="search"
                className="form-control form-control-dark"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>
          )}
          {/* <div className="text-end"> */}
          <button type="button" className="btn btn-outline-light me-2" onClick={logOut}>
            Logout
          </button>
          {/* </div> */}
        </div>
      </Container>
    </header>
  );
}

export default Header;
