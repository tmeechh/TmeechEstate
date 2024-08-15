import { GlobeAltIcon } from "@heroicons/react/24/solid";


const Footer = () => {
  return (
      <div>
          <div className='bg-gray-100'>
      <div className='bg-[#021342] p-8 flex flex-col items-center    gap-5 text-gray-200'>
        <h1 className='sm:text-2xl text-[18px] whitespace-nowrap'>About TmeechEstate Affiliates LLC</h1>
        <p className='font-sans sm:text-[14px] text-[12px] text-gray-400 mx-8'>
          {' '}
       Founded in 2024
          to empower independent brokerages with a robust marketing and referral
          platform for luxury listings, the TmeechEstate network was crafted to
          connect the finest independent real estate firms with the most
          distinguished clientele globally. TmeechEstate Affiliates LLC is a
          subsidiary of Anywhere Real Estate Inc. (NYSE: HOUS), a global leader
          in real estate franchising and provider of brokerage, relocation, and
          settlement services. Affiliations within the network are granted
          solely to brokerages and individuals meeting rigorous standards.
          TmeechEstate Affiliates LLC provides its partners with a wide range of
          operational, marketing, recruitment, educational, and business
          development resources. Franchise affiliates also enjoy the prestige of
          association with the esteemed Tmeech auction house, established in
          2024.
        </p>
              </div>
     <div className='flex flex-col flex-wrap mx-auto items-center justify-center gap-5  p-12'>
              <div className=' items-center text-[#333333] mx-auto justify-center flex-wrap flex gap-3'>
                  <p className="font-sans cursor-pointer hover:text-gray-500">Facebook</p>
                  <span className="inline-block  w-1 h-1 bg-amber-500 rounded-full"></span>
                  <p className="font-sans cursor-pointer hover:text-gray-500">X</p>
                  <span className="inline-block  w-1 h-1 bg-amber-500 rounded-full"></span>
                  <p className="font-sans cursor-pointer hover:text-gray-500">LinkedIn</p>
                  <span className="inline-block  w-1 h-1 bg-amber-500 rounded-full"></span>
                  <p className="font-sans cursor-pointer hover:text-gray-500">Instagram</p>
                  <span className="inline-block  w-1 h-1 bg-amber-500 rounded-full"></span>
                  <p className="font-sans cursor-pointer hover:text-gray-500">Pinterest</p>
                  <span className="inline-block  w-1 h-1 bg-amber-500 rounded-full"></span>
                  <p className="font-sans cursor-pointer hover:text-gray-500">Youtube</p>
                  <span className="inline-block  w-1 h-1 bg-amber-500 rounded-full"></span>
                  <p className="font-sans cursor-pointer hover:text-gray-500">Tiktok</p>
              </div>
                  <p className='uppercase text-gray-400 text-center sm:text-[13px] text-[10px]'>DO NOT SELL OR SHARE YOUR PERSONAL INFORMATION</p>
                  
              </div>

              <div className="flex gap-3 items-center  text-[#021342] p-10  text-[13px]">
                  <GlobeAltIcon className="cursor-pointer w-5 text-[#021342]  h-5 " />
                  English - United Kingdom
              </div>

              <div className="pb-5 border-t border-gray-400 p-6">
                  <p className="text-center text-[#021342] font-sans  text-[13px] ">Copyright © 2024 TmmechEstate Affiliates LLC. All Rights Reserved.</p>
              </div>
             
              </div>
    </div>
  );
};

export default Footer;
