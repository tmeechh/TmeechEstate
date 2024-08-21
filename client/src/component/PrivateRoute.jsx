import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const allowedUserIds = ['669c46c2c8a948365b5d87ac', '66a5868be14c9fc5faf9a2e1'];

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
