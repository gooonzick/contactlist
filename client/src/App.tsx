import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import ErrorModal from './components/ErrorModal/ErrorModal';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AuthPage from './Pages/AuthPage/AuthPage';
import HomePage from './Pages/HomePage/HomePage';
import MyContactsPage from './Pages/MyContactsPage/MyContactsPage';
import { setCredentials } from './redux/slices/userSlice';

const getAuthState = () => ({
  user: JSON.parse(localStorage.getItem('user') ?? ''),
  token: sessionStorage.getItem('token') ?? '',
});

function App() {
  const dispath = useDispatch();
  const authState = getAuthState();
  if (authState.token && authState.user) {
    dispath(setCredentials(authState));
  }
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
