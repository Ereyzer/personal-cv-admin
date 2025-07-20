import { Navigate } from 'react-router-dom';
import { useUser } from '../components/context/user/userContext';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Main from '../components/main/Main';

function AdminPage() {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default AdminPage;
