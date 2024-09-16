import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SignIn from './Modals/SignIn.jsx';
import SignUp from './Modals/SignUp.jsx';
import About from './pages/About.jsx';
import Profile from './Modals/Profile.jsx';
import Navbar from './component/Navbar.jsx';
import PrivateRoute from './component/PrivateRoute.jsx';
import CreatingListing from './pages/CreatingListing.jsx';
import ForgotPassword from './Modals/ForgotPassword.jsx';
import ResetPassword from './Modals/ResetPassword.jsx';
import { useState } from 'react';
import UpdateListing from './pages/UpdateListing.jsx';
import Listing from './pages/Listing.jsx';
import Search from './pages/Search.jsx';
import { Toaster } from 'sonner';
import YourListings from './pages/YourListings.jsx';
import SellWithUs from './pages/SellWithUs.jsx';
import Photos from './Modals/Photos.jsx';
import SavedListings from './pages/SavedListings.jsx';
import ListingItem from './component/ListingItem.jsx';

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const [showReset, setShowReset] = useState(false);
  const [resetData, setResetData] = useState({ email: '', otp: '' });
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [images, setImages] = useState([]);

  const handleShowProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false);

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
      <Toaster position="top-right" richColors/>
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

      {showProfile ? (
        <Profile onClose={handleCloseProfile}  />
      ) : null}

      {showReset ? (
        <ResetPassword
          onClose={handleCloseReset}
          email={resetData.email}
          otp={resetData.otp}
        />
      ) : null}

      <Navbar onSignIn={handleShowSignIn} onProfile={handleShowProfile} />

      <Routes>
        <Route path="/" element={<Home onSignIn={handleShowSignIn} />} />

        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/sell-with-us" element={<SellWithUs />} />
        <Route path="/search" element={<Search  onSignIn={handleShowSignIn} />} />
        <Route path="/saved-listings" element={<SavedListings   onSignIn={handleShowSignIn}/>} />
        <Route
          path="/listing/:listingId"
          element={
            <Listing
              onSignIn={handleShowSignIn}
              handleShowPhotos={handleShowPhotos}
            />
          }
        />

    
<Route element={<PrivateRoute handleShowSignIn={handleShowSignIn} restricted />}>
  <Route path="/create-listing" element={<CreatingListing />} />
  <Route path="/update-listing/:listingId" element={<UpdateListing />} />
  <Route path="/your-listings" element={<YourListings />} />
</Route>
      </Routes>

    
      
      
    </BrowserRouter>
  );
};

export default App;
