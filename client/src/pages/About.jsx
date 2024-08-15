import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import face from '../assets/face.png';
import about from '../assets/about.png';
import house from '../assets/house.png';
import lead from '../assets/lead.png';
import sec from '../assets/sec.png';
import Footer from '../component/Footer';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <div className="bg-[#0b1636]  flex flex-col h-[400px] md:h-[90vh]  lg:h-[100vh] text-white items-center">
        <h1 className=" lg:text-6xl text-5xl text-center mt-12 mb-6">
          {' '}
          About Us
        </h1>
        <p className="sm:text-2xl  text-center font-sans">
          Transforming the luxury real estate sector with a{' '}
          <br className="lg:hidden" /> worldwide team of{' '}
          <br className="hidden lg:inline-block" />
          elite agents
        </p>
      </div>
      {/* image */}
      <div className="relative flex flex-col items-center justify-center mt-[-9rem] md:mt-[-15rem] lg:mt-[-26rem] xl:mt-[-20rem]">
        <div className="absolute top-[-1%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1px] h-20 bg-amber-700"></div>
        <img className="w-[90vw] rounded" src={face} alt="" />
      </div>

      {/* Details */}
      <div className="pt-12 h-full">
        <div className="flex flex-col flex-wrap mx-auto items-center justify-center gap-5  p-12">
          <div className=" items-center mx-auto  justify-center flex-wrap flex-col sm:flex-row flex gap-12">
            <div className="font-sans flex flex-col items-center text-center text-gray-500">
              <p className="text-gray-500 text-[14px] uppercase pb-6">
                GLOBAL <br />
                REACH
              </p>
              <h1 className="text-[#333333] text-5xl pb-3">42</h1>
              <p className="text-[#333333]">Countries & Territories</p>
            </div>
            <span className="sm:inline-block  hidden  w-[0.6px] h-52 bg-amber-500 rounded-full"></span>
            <div className="font-sans flex flex-col items-center text-center text-gray-500">
              <div className="inline-block  w-24 sm:hidden h-[0.6px] mb-4 text-center bg-amber-500 "></div>
              <p className="text-gray-500 text-[14px] pb-6 uppercase">
                OUR <br />
                NETWORK
              </p>
              <h1 className="text-[#333333] text-5xl pb-3"> 910</h1>
              <p className="text-[#333333]">Offices Worldwide</p>
            </div>
            <span className="sm:inline-block hidden  w-[0.6px] h-52 bg-amber-500 rounded-full"></span>
            <div className="font-sans flex flex-col items-center text-center text-gray-500">
              <div className="inline-block  w-24 sm:hidden h-[0.6px] mb-4 text-center bg-amber-500 "></div>
              <p className="text-gray-500 text-[14px] pb-6 uppercase">
                LOCAL <br />
                EXPERTISE
              </p>
              <h1 className="text-[#333333] text-5xl pb-3">18,400</h1>
              <p className="text-[#333333]">Sales associates</p>
            </div>
            <span className="lg:inline-block  w-[0.6px] hidden h-52 bg-amber-500 rounded-full"></span>
            <div className="font-sans flex  flex-col items-center text-center text-gray-500">
              <div className="inline-block  w-24 lg:hidden h-[0.6px] mb-4 text-center bg-amber-500 "></div>
              <p className="text-gray-500 pb-6 text-[14px] uppercase">
                2024 GLOBAL <br />
                SALES VOLUME
              </p>
              <h1 className="text-[#333333] text-5xl pb-3">$88B</h1>
              <p className="text-[#333333]">Annual Sales (USD)</p>
            </div>
          </div>
        </div>
      </div>

      {/* m */}
      <div className="flex flex-col  items-center mx-7 md:mx-52 lg:mx-72 flex-wrap   xl:mx-96 gap-5  py-16">
        <h1 className=" text-3xl text-[#333333] ">
          Expertise wherever you are and wherever you aim to be.
        </h1>
        <p className=" font-sans   text-gray-500">
          TmeechEstate is the only truly global real estate brand, with a
          network of top residential brokers. Through our personal connections,
          sellers reach an elite global clientele — and buyers access
          exceptional properties and agents everywhere.
        </p>
      </div>
      <div className="bg-[#0b1636]  p-12 text-white">
        <div className="mx-auto   flex-wrap   xl:mx-64 text-center flex flex-col items-center  gap-6 ">
          <h1 className="text-4xl">Raising the global excellence bar.</h1>

          <p className='font-sans'>
            Established in 2024, TmeechEstate has become the world top-tier
            luxury residential real estate brokerage. Through our extensive
            global presence, local insight, and unmatched referral network, we
            guarantee that the properties we represent receive the comprehensive
            and extraordinary exposure they deserve.
          </p>
          <Link to="/create-listing" className="flex flex-col  gap-5  ">
            <div className="uppercase text-[12px] lg:text-[14px] border border-amber-700 lg:p-4 p-2 flex items-center gap-2 font-josefin ">
              sell with us
              <ArrowLongRightIcon className="w-6 lg:w-8 h-6 mb-[-20px]  transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:translate-x-2 hover:scale-110 flex items-center justify-center" />
            </div>
          </Link>
        </div>
      </div>

      <div>
        <div className="flex sm:flex-row flex-col gap-7 xl:gap-28 xl:p-24  sm:px-7 py-24 mx-10">
          <img
            src={about}
            className="xl:w-[40%] sm:w-[50%] w-full z-20 h-[85vh] xl:h-[100vh]"
            alt=""
          />
          <div className="absolute z-50 hidden xl:inline-block mt-[4rem] left-[44%] transform -translate-x-1/2 -translate-y-1/2 h-[1px] w-36 bg-amber-700"></div>
          <div className="flex xl:w-[50%] flex-col gap-4 pt-10 ">
            <h1 className="sm:text-4xl text-3xl text-[#333333]">
              A worldwide network of elite agents and unique properties.
            </h1>
            <p className="text-gray-500 font-sans">
              Our global network reaches 42 countries and territories. Discover
              a home that fits your lifestyle by exploring everything
              TmeechEstate offers worldwide. .
            </p>
          </div>
        </div>

        <div className="xl:pl-64 lg:pl-44 flex xl:gap-0 gap-10 xl:flex-row flex-col items-center pb-24 lg:mt-[-9rem] sm:mt-[-8rem]">
          <img
            src={house}
            className="xl:w-[45%] lg:w-[80%] sm:w-[55%] w-full h-[60vh] mx-10"
            alt=""
          />
          <div className="absolute z-50 hidden xl:inline-block mt-[-14rem] left-[58%] transform -translate-x-1/2 -translate-y-1/2 h-[1px] w-36 bg-amber-700"></div>
          <div className="flex flex-col xl:ml-0 lg:ml-[-8rem] gap-6  xl:pl-12">
            <h1 className="xl:text-3xl text-4xl  text-[#333333]">
              Our global reach:
            </h1>
            <div className="flex xl:gap-24 gap-32">
              <div className="flex flex-col text-[#333333] gap-3">
                <p className=" font-sans">New York</p>
                <p className=" font-sans">Miami</p>
                <p className=" font-sans">Bahamas</p>
                <p className=" font-sans">Tokyo</p>
              </div>
              <div className="flex flex-col text-[#333333] gap-3">
                <p className=" font-sans">France</p>
                <p className=" font-sans">Spain</p>
                <p className=" font-sans">South Africa</p>
                <p className=" font-sans">Morocco</p>
              </div>
            </div>
            <p className=" font-sans text-center text-xl text-[#333333]">And More....</p>
          </div>
        </div>
      </div>
      <div className="bg-[#0b1636] text-white py-20 gap-10 flex flex-col items-center ">
        <h1 className="lg:text-4xl text-3xl text-center mx-2 pb-24 ">
          Properties handled by true professionals.
        </h1>
        <div className="flex flex-col md:flex-row gap-10 mx-10 xl:mx-20">
          <div className="flex gap-4 flex-col">
            <img src={lead} className='h-[60vh]' alt="" />
            <h3 className="text-xl font-josefin">Experienced leadership.</h3>
            <p className="text-sm font-sans">
              The TmeechEstate leadership team brings together a remarkable
              depth and breadth of experience. Each of us is dedicated to
              supporting our associates and serving our clients better than any
              other real estate company possibly can.
            </p>
          </div>
          <div className="flex gap-4 flex-col">
            <img src={lead} className='h-[60vh]' alt="" />
            <h3 className="text-xl font-josefin">Local expertise. Global connections.</h3>
            <p className="text-sm font-sans">
              The culture of the TmeechEstate brand is defined
              by its people; our exceptional sales associates, who range from
              Tokyo to Telluride, and Paris to Palm Beach, provide personalized
              service and local expertise that help clients achieve their
              dreams.
            </p>
          </div>
        </div>
      </div>

      
      <div className="flex flex-col items-center sm:mx-auto mx-12 gap-5 my-16 mb-24">
        <h1 className="text-3xl pb-16 pt-10">Lets get in touch</h1>
        <Link to="/create-listing" className="flex flex-col  gap-5  ">
          <img src={sec} alt="sell" />
          <p className="text-[#081d57] sm:text-[20px]">
            Do you want to list your home?
          </p>
          <div className="uppercase text-[12px] sm:text-[16px] text-[#081d57] flex items-center gap-2 font-josefin ">
            see details
            <ArrowLongRightIcon className=" w-8 h-6 mb-[-20px]  transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:translate-x-2 hover:scale-110 flex items-center justify-center" />
          </div>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default About;
