import './App.css';
import { Route, Routes } from 'react-router-dom';

import AdminPage from '../pages/adminPage';
import LoginPage from '../pages/login/loginPage';
import NotFoundPage from '../pages/NotFoundPage';
import StatPage from '../pages/StatPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/stat" element={<StatPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
