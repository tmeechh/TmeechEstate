import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import sell from '../assets/sell.png';
import about from '../assets/laptop.png';
import house from '../assets/brand.png';
import mingle from '../assets/mingle.png';
import phone from '../assets/phone.png';
import news from '../assets/news.png';
import people from '../assets/people.png';
import globe from '../assets/globe.png';
import Footer from '../component/Footer';
import Spinner from '../Spinner';
import { useState } from 'react';
// import { Link } from 'react-router-dom';

const SellWithUs = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    errors: {
      firstName: false,
      lastName: false,
      email: false,
      message: false,
    },
    isTouched: {
      firstName: false,
      lastName: false,
      email: false,
      message: false,
    },
  });

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: !value.trim() && prevState.isTouched[name],
      },
      isTouched: {
        ...prevState.isTouched,
        [name]: true,
      },
    }));
  }

  const message = `
        First Name: ${formData.firstName}
        Last Name: ${formData.lastName}
        Email: ${formData.email}
        Phone: ${formData.phone || 'N/A'}
        Message: ${formData.message}
      `;

  function handleSubmit(event) {
    event.preventDefault();

    // Validate all required fields
    const errors = {
      firstName: !formData.firstName.trim(),
      lastName: !formData.lastName.trim(),
      email: !formData.email.trim(),
      message: !formData.message.trim(),
    };

    setFormData((prevState) => ({
      ...prevState,
      errors: errors,
      isTouched: {
        firstName: true,
        lastName: true,
        email: true,
        message: true,
      },
    }));

    const hasErrors = Object.values(errors).some((error) => error);

    if (!hasErrors) {
      const mailtoLink = `mailto:esantaiwo77@gmail.com?subject=Regarding Listing a Home&body=${encodeURIComponent(
        `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage: ${formData.message}`
      )}`;
      window.location.href = mailtoLink;
    }
  }

  return (
    <>
      <div className="bg-[#0b1636]  flex flex-col h-[400px] md:h-[90vh]  lg:h-[100vh] text-white items-center">
        <h1 className=" lg:text-6xl text-5xl text-center mt-12 mb-6">
          {' '}
          Sell with us
        </h1>
        <p className="sm:text-2xl  text-center font-sans">
          Remarkable homes require outstanding promotion.
        </p>
      </div>
      {/* image */}
      <div className="relative flex flex-col items-center justify-center mt-[-10rem] md:mt-[-16rem] lg:mt-[-27rem] xl:mt-[-22rem]">
        <div className="absolute top-[-1%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1px] h-20 bg-amber-700"></div>
        <img className="w-[90vw] rounded" src={sell} alt="" />
      </div>

      {/* Details */}

      {/* m */}
      <div className="flex flex-col  items-center mx-7 md:mx-52 lg:mx-72 flex-wrap   xl:mx-96 gap-5  py-16">
        <h1 className=" text-3xl text-[#333333] ">
          Do not just get it listed. Get it the attention it merits.
        </h1>
        <p className=" font-sans   text-gray-500">
          For those who seek unparalleled service like no other, there is
          TmeechEstate. We are the industry top agents, crafting with unmatched
          focus on style and detail. We are here to assist in selling your home
          at a level you simply will not find anywhere else.
        </p>
      </div>
      <div className="bg-[#0b1636]  py-12 text-white">
        <div className="mx-auto   flex-wrap    flex flex-col items-center  gap-6 ">
          <h1 className="sm:text-4xl text-2xl text-center">
            Sell Your Home with TmeechEstate
          </h1>

          <p className="font-sans text-[12px] sm:text-[16px] lg:mx-0 md:mx-6 mx-3 text-center xl:mx-64">
            If you are planning a move anywhere worldwide, it would be our honor
            to assist in achieving your best result.
          </p>
          <div className="flex flex-col md:flex-row gap-10 md:mx-10 xl:mx-20">
            <div className="flex gap-4 flex-col">
              <img src={people} className="xl:h-[60vh] h-[50vh]" alt="" />
              <h3 className="text-xl font-josefin sm:mx-0 mx-6">
                Connect with a local expert to guide your journey.
              </h3>
              <p className="text-sm font-sans sm:mx-0 mx-6">
                Our team of local real estate experts uses their market
                knowledge to craft a tailored and detailed plan for your home.
                Locate an agent nearby and discover their local insights.
              </p>
            </div>
            <div className="flex gap-4 flex-col">
              <img src={mingle} className="xl:h-[60vh] h-[50vh]" alt="" />
              <h3 className="text-xl font-josefin sm:mx-0 mx-6">
                Benefit from our local knowledge and outstanding service.
              </h3>
              <p className="text-sm font-sans sm:mx-0 mx-6">
                With experts worldwide, we are local everywhere. Using
                cutting-edge technology and unmatched service, our local offices
                can enhance your property and selling experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex sm:flex-row flex-col gap-7 xl:gap-28 xl:p-24  sm:px-7 py-24 mx-10">
          <img
            src={about}
            className="xl:w-[40%] sm:w-[50%] w-full rounded z-20 h-[85vh] xl:h-[100vh]"
            alt=""
          />
          <div className="absolute z-50 hidden xl:inline-block mt-[4rem] left-[44%] transform -translate-x-1/2 -translate-y-1/2 h-[1px] w-36 bg-amber-700"></div>
          <div className="flex xl:w-[50%] flex-col gap-4 pt-10 ">
            <h1 className="sm:text-4xl text-3xl text-[#333333]">
              Be where the world is watching.
            </h1>
            <p className="text-gray-500 font-sans">
              The homes we represent gain from the global prestige of the
              TmeechEstate name and receive exclusive access to top-tier
              international clients. Our award-winning website, available in 14
              languages, draws more visitors than any other luxury real estate
              site. Our connections with major media outlets boost site traffic
              and enhance exposure for our listings.
            </p>
          </div>
        </div>

        <div className="xl:pl-64 lg:pl-44 flex xl:gap-0 gap-10 xl:flex-row flex-col items-center pb-24 lg:mt-[-9rem] sm:mt-[-4rem]">
          <img
            src={house}
            className="xl:w-[45%] lg:w-[80%] rounded-lg sm:w-[55%] w-full h-[60vh] mx-10"
            alt=""
          />
          <div className="absolute z-50 hidden xl:inline-block mt-[-12rem] left-[58%] transform -translate-x-1/2 -translate-y-1/2 h-[1px] w-36 bg-amber-700"></div>
          <div className="flex flex-col sm:px-0 px-5 xl:ml-0 lg:ml-[3rem]  md:ml-[10rem] lg:gap-6 md:gap-4 gap-4 xl:pl-12">
            <h1 className="xl:text-3xl  lg:text-4xl md:text-3xl text-2xl  text-[#333333]">
              What you can get only with{' '}
              <br className="hidden xl:inline-block" /> us:
            </h1>
            <div className="grid text-[14px] sm:text-[16px] grid-cols-2  xl:grid-cols-2 sm:grid-cols-3 xl:gap-5 lg:gap-10 gap-5 ">
              <p className=" font-sans">
                Unmatched <br className="lg:hidden inline-block" /> marketing
              </p>
              <p className=" font-sans">Media relations powerhouse</p>
              <p className=" font-sans">Genuine global reach</p>

              <p className=" font-sans">
                Exclusive <br />
                alliances
              </p>
              <p className=" font-sans">Brand legacy and reputation</p>
              <p className=" font-sans">Unparalleled service</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0b1636] text-white py-20 gap-10 flex flex-col items-center ">
        <h1 className="lg:text-4xl flex-wrap   lg:mx-52  text-3xl text-center sm:mx-12 mx-3 ">
          Expertise that spans from the block to the globe.
        </h1>
        <p className="text-center mx-7 md:mx-24 lg:mx-72 flex-wrap   xl:mx-96 ">
          We distribute our listings to the most relevant websites worldwide and
          gauge the impact with advanced analytics. Our global partners include
          leading news, lifestyle, and financial sources, as well as real
          estate-focused sites. No one matches the expertise and exposure we
          provide.
        </p>
      </div>

      <div className="flex flex-col items-center sm:mx-auto mx-12 gap-5 my-16 mb-24">
        <p className="text-[12px] uppercase text-slate-500">
          Unmatched social media
        </p>
        <h1 className="text-3xl md:text-4xl">
          We attract more attention to your listing.
        </h1>
        <p className="text-center mx-7 md:mx-24 lg:mx-72 flex-wrap font-sans sm:text-[16px] text-[14px]  xl:mx-96 ">
          At TmeechEstate, we produce unique content to showcase your property
          to enthusiasts of luxury living.
        </p>
        <div className="pt-12 h-full">
          <div className="flex flex-col flex-wrap mx-auto items-center justify-center gap-5  p-12">
            <div className=" items-center mx-auto  justify-center sm:flex-nowrap flex-wrap flex-col sm:flex-row flex gap-12">
              <div className="font-sans flex flex-col items-center text-center text-gray-500">
                <h1 className="text-[#333333] text-5xl pb-3 uppercase">900k</h1>
                <p className="text-[#333333]">Active social followers</p>
              </div>
              <span className="sm:inline-block  hidden  w-[0.6px] h-52 bg-amber-500 rounded-full"></span>

              <div className="font-sans flex flex-col items-center text-center text-gray-500">
                <div className="inline-block  w-24 sm:hidden h-[0.6px] mb-4 text-center bg-amber-500 "></div>

                <h1 className="text-[#333333] text-5xl pb-3">#2</h1>
                <p className="text-[#333333]">
                  Top two most-watched real estate channels <br /> on YouTube
                </p>
              </div>
              <span className="md:inline-block  w-[0.6px] hidden h-52 bg-amber-500 rounded-full"></span>
              <div className="font-sans flex  flex-col items-center text-center text-gray-500">
                <div className="inline-block  w-24 md:hidden h-[0.6px] mb-4 text-center bg-amber-500 "></div>

                <h1 className="text-[#333333] text-5xl pb-3 uppercase">32m</h1>
                <p className="text-[#333333]">
                  Annual visits to tmmechestate.com <br />
                  in 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 items-center pb-24">
        <p className="text-[12px] sm:mx-0 mx-6 uppercase text-slate-500">
          Distinctive highlights
        </p>
        <h1 className="text-center text-3xl mx-7 md:mx-24 pb-12 text-[#333333] lg:mx-72 lg:text-3xl  ">
          Your homes marketing should have that wow factor as well.
        </h1>
        <div className="flex flex-col w-auto sm:flex-row gap-10  md:mx-12 lg:mx-10 pb-12 xl:mx-20">
          <div className="flex gap-4 w-fit flex-col">
            <img
              src={news}
              className="xl:h-[60vh] opacity-[70%] rounded h-[40vh]"
              alt=""
            />
            <p className="text-gray-500 uppercase text-[12px] sm:mx-0 mx-6">
              In the Spotlight
            </p>
            <h3 className="text-xl font-josefin sm:mx-0 mx-6 text-[#0b1636]">
              Media Exposure
            </h3>
            <p className="text-sm font-sans sm:mx-0 mx-6 text-[#333333]">
              As the #2 most featured luxury real estate brand in the news,
              TmeechEstate leads the dialogue. The brands award-winning press
              office and PR strategies establish it as a leader in luxury real
              estate, driving traffic to the website and boosting TmeechEstate
              listings.
            </p>
          </div>
          <div className="flex gap-4 w-fit flex-col">
            <img src={globe} className="xl:h-[60vh] h-[40vh]" alt="" />
            <p className="text-gray-500 uppercase text-[12px] sm:mx-0 mx-6">
              Unmatched network
            </p>
            <h3 className="text-xl font-josefin sm:mx-0 text-[#0b1636] mx-6">
              Global Connections
            </h3>
            <p className="text-sm font-sans sm:mx-0  text-[#333333] mx-6">
              TmeechEstate is the only truly global luxury real estate company
              with 18,400 advisors in over 910 local offices across 42 countries
              and territories. Our unmatched network collaborates to meet your
              needs and exceed your expectations.
            </p>
          </div>
          <div className="flex gap-4 w-fit flex-col">
            <img
              src={phone}
              className="xl:h-[60vh] rounded opacity-[80%] h-[40vh]"
              alt=""
            />
            <p className="text-gray-500 uppercase text-[12px] sm:mx-0 mx-6">
              The pinnacle of excellence
            </p>
            <h3 className="text-xl text-[#0b1636] font-josefin sm:mx-0 mx-6">
              Unrivaled marketing
            </h3>
            <p className="text-sm font-sans sm:mx-0 text-[#333333] mx-6">
              TmeechEstate partners with top creative agencies and our internal
              team to effectively engage with global consumers, always ensuring
              sophisticated design remains at the core. This approach can
              enhance your property and elevate your home selling experience.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-200">
        <div className="mx-10 flex xl:flex-row flex-col gap-12 pt-20 pb-28 md:px-20">
          <div className="xl:w-[50%] flex-col flex gap-8">
            <h1 className="text-[#333333] lg:text-4xl text-2xl">
              Sell your home with our tailored solution for you.
            </h1>
            <p className="text-[#333333] font-sans">
              Connect with our local experts who can create a comprehensive and
              customized plan for your home that takes into consideration all
              avenues of marketing.
            </p>
          </div>
          <div className="xl:w-fit w-full flex flex-col gap-8">
            <h1 className="lg:text-3xl text-2xl">Lets get in touch</h1>
            <form className="grid grid-cols-2 gap-12" onSubmit={handleSubmit}>
              <div>
                {formData.errors.firstName && formData.isTouched.firstName && (
                  <p className="text-red-500 text-sm ">
                    This field is required.
                  </p>
                )}
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`border-b xl:w-56 placeholder-slate-600 outline-none bg-transparent text-[#333333] ${
                    formData.errors.firstName
                      ? 'border-red-500'
                      : 'border-[#333333]'
                  }`}
                />
              </div>
              <div>
                {formData.errors.lastName && formData.isTouched.lastName && (
                  <p className="text-red-500 text-sm ">
                    This field is required.
                  </p>
                )}

                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`border-b xl:w-56 placeholder-slate-600 outline-none bg-transparent text-[#333333] ${
                    formData.errors.lastName
                      ? 'border-red-500'
                      : 'border-[#333333]'
                  }`}
                />
              </div>
              <div>
                {formData.errors.email && formData.isTouched.email && (
                <p className="text-red-500 text-sm col-span-2">
                  This field is required.
                </p>
              )}
              
              <input
                name="email"
                
                type="text"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className={`border-b xl:w-56 placeholder-slate-600 outline-none bg-transparent text-[#333333] ${
                  formData.errors.email ? 'border-red-500' : 'border-[#333333]'
                }`}
              />
              </div>
             
           

              <input
                type="number"
                name="phone"
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChange={handleInputChange}
                className="border-b outline-none xl:w-56 placeholder-slate-600 border-[#333333] bg-transparent text-[#333333]"
              />

              <div className="col-span-2">
              {formData.errors.message && formData.isTouched.message ? (
    <p className="text-red-500 text-sm">This field is required.</p>
  ) : (
    <p className="text-slate-600 font-sans pb-3">Message</p>
  )}
               
                <textarea
                  name="message"
                  
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full h-28 p-3 placeholder-slate-600 outline-none border bg-transparent text-[#333333] ${
                    formData.errors.message
                      ? 'border-red-500'
                      : 'border-[#333333]'
                  }`}
                  placeholder="I'd like to discuss selling with you"
                ></textarea>
               
              </div>

              <button
                type="submit"
                disabled={loading}
                className="uppercase flex items-center disabled:opacity-75 hover:opacity-75 md:w-[50%] w-[65%] gap-4 bg-[#0b1636] text-white p-5 col-span-2"
              >
                {loading ? (
                  <Spinner className="w-7 h-7 border-white mt-0 mb-0 mx-auto" />
                ) : (
                  <>
                    Send Message
                    <ArrowLongRightIcon className="w-8 h-6 mb-[-20px] transform text-white -translate-y-1/2 transition-transform duration-300 ease-in-out hover:translate-x-2 hover:scale-110 flex items-center justify-center" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellWithUs;
