import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ handleShowSignIn }) => {
  const { currentUser } = useSelector((state) => state.user);

  // console.log(currentUser);
  if (!currentUser) {
     handleShowSignIn();
    return null;
  }

  return <Outlet />;
};

export default PrivateRoute;
