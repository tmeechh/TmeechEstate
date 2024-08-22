import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const allowedUserIds = import.meta.env.VITE_ALLOWED_USER_IDS
  ? import.meta.env.VITE_ALLOWED_USER_IDS.split(',')
  : [];


const PrivateRoute = ({ handleShowSignIn, restricted = false }) => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    handleShowSignIn();
    return null;
  }

  if (restricted && !allowedUserIds.includes(currentUser._id)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
