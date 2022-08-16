/* eslint-disable no-undef */
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

type Props = {
    children: JSX.Element
}

function ProtectedRoute(props: Props) {
  const { children } = props;
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  if (!user?.name) return <Navigate to="/auth" />;
  return children;
}

export default ProtectedRoute;
