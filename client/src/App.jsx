import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile.jsx';
import Navbar from './component/Navbar.jsx';
import PrivateRoute from './component/PrivateRoute.jsx';
import CreatingListing from './pages/CreatingListing.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import { useState } from 'react';
import UpdateListing from './pages/UpdateListing.jsx';

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleShowSignIn = () => setShowSignIn(true);
  const handleCloseSignIn = () => setShowSignIn(false);

  const handleCloseSignUp = () => setShowSignUp(false);

  const swapModal = () => {
    setShowSignIn(!showSignIn);
    setShowSignUp(!showSignUp);
  };

  return (
    <BrowserRouter>
      {showSignIn ? (
        <SignIn onClose={handleCloseSignIn} swapModal={swapModal} />
      ) : null}
      {showSignUp ? (
        <SignUp
          onClose={handleCloseSignUp}
          swapModal={swapModal}
          handleShowSignIn={handleShowSignIn}
        />
      ) : null}

      <Navbar onSignIn={handleShowSignIn} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute handleShowSignIn={handleShowSignIn} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreatingListing />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
