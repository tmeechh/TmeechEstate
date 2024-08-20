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
import Listing from './pages/Listing.jsx';
import Search from './pages/Search.jsx';
import { Toaster } from 'sonner';
import YourListings from './pages/YourListings.jsx';
import SellWithUs from './pages/SellWithUs.jsx';
import Photos from './component/Photos.jsx';

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const [showReset, setShowReset] = useState(false);
const [resetData, setResetData] = useState({ email: '', otp: '' });
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  const [images, setImages] = useState([]);

  const handleShowSignIn = () => setShowSignIn(true);
  const handleCloseSignIn = () => setShowSignIn(false);

  const handleShowForgot = () => setShowForgot(true);
  const handleCloseForgot = () => setShowForgot(false);

  const handleShowReset = (email, otp) => {
    setResetData({ email, otp });
    setShowReset(true);
  };
  const handleCloseReset = () => setShowReset(false);

  const handleCloseSignUp = () => setShowSignUp(false);

  const swapModal = () => {
    setShowSignIn(!showSignIn);
    setShowSignUp(!showSignUp);
  };

  const swapPass = () => {
    setShowForgot(!showForgot);
    setShowSignIn(!showSignIn);
  };

  const swapReset = () => {
    setShowForgot(!showForgot);
    setShowReset(!showReset);
  };

  const handleShowPhotos = (imageUrls) => {
    setImages(imageUrls);
    setShowPhotos(true);
  }; // Add this line
  const handleClosePhotos = () => setShowPhotos(false);

  return (
    <BrowserRouter className="overflow-x-hidden">
      <Toaster position="top-right" />
      {showSignIn ? (
        <SignIn
          onClose={handleCloseSignIn}
          onForgot={handleShowForgot}
          swapModal={swapModal}
        />
      ) : null}
      {showSignUp ? (
        <SignUp
          onClose={handleCloseSignUp}
          swapModal={swapModal}
          handleShowSignIn={handleShowSignIn}
        />
      ) : null}
      {showPhotos && <Photos onClose={handleClosePhotos} images={images} />}

      {showForgot ? (
        <ForgotPassword
          handleShowSignIn={handleShowSignIn}
          handleShowReset={handleShowReset}
          onClose={handleCloseForgot}
          swapPass={swapPass}
        />
      ) : null}

      {showReset ? <ResetPassword onClose={handleCloseReset} email={resetData.email} otp={resetData.otp} /> : null}

      <Navbar onSignIn={handleShowSignIn} />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/sell-with-us" element={<SellWithUs />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/listing/:listingId"
          element={
            <Listing
              onSignIn={handleShowSignIn}
              handleShowPhotos={handleShowPhotos}
            />
          }
        />

        <Route element={<PrivateRoute handleShowSignIn={handleShowSignIn} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreatingListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
          <Route path="/your-listings" element={<YourListings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
