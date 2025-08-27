import { Navigate } from 'react-router-dom';
import { useUser } from '../components/context/user/userContext';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import StatisticsSection from '../components/main/sttatistics/StatisticsSection';

function StatPage() {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <StatisticsSection />
      <Footer />
    </>
  );
}

export default StatPage;
