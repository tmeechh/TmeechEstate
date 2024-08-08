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
import { useEffect, useState } from 'react';
import UpdateListing from './pages/UpdateListing.jsx';
import Listing from './pages/Listing.jsx';
import Search from './pages/Search.jsx';
import { Toaster } from 'sonner'
import YourListings from './pages/YourListings.jsx';
import Photos from './component/Photos.jsx';

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
 
  const [images, setImages] = useState([]);

  const handleShowSignIn = () => setShowSignIn(true);
  const handleCloseSignIn = () => setShowSignIn(false);

  const handleCloseSignUp = () => setShowSignUp(false);

  const swapModal = () => {
    setShowSignIn(!showSignIn);
    setShowSignUp(!showSignUp);
  };


 
  const handleShowPhotos = (imageUrls) => {
    setImages(imageUrls);
    setShowPhotos(true);
  };// Add this line
  const handleClosePhotos = () => setShowPhotos(false);

  // useEffect(() => {
  //   if (showPhotos) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }
  //   // Cleanup on unmount
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, [showPhotos]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
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
              {showPhotos && <Photos onClose={handleClosePhotos} images={images} />}



      <Navbar onSignIn={handleShowSignIn} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<Listing handleShowPhotos={handleShowPhotos}/>} />


        <Route element={<PrivateRoute handleShowSignIn={handleShowSignIn} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreatingListing />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />
          <Route path="/your-listings" element={<YourListings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
