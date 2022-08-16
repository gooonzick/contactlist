import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import ErrorModal from './components/ErrorModal/ErrorModal';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AuthPage from './Pages/AuthPage/AuthPage';
import HomePage from './Pages/HomePage/HomePage';
import MyContactsPage from './Pages/MyContactsPage/MyContactsPage';
import { setCredentials } from './redux/slices/userSlice';

const getAuthState = () => {
  const userFromStorage = localStorage.getItem('user');
  const tokenFromStorage = sessionStorage.getItem('token');
  if (userFromStorage && tokenFromStorage) {
    return { user: JSON.parse(userFromStorage), token: tokenFromStorage };
  }
  return null;
};

function App() {
  const dispath = useDispatch();
  const authState = getAuthState();

  useMemo(() => {
    if (authState) {
      dispath(setCredentials(authState));
    }
  }, [authState]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="mycontacts" element={<ProtectedRoute><MyContactsPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
