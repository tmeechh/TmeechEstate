import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import {
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import useWindowSize from '../component/UseWindowSize';
import prev from '../assets/prev.png';
import next from '../assets/next.png';

const Photos = ({ onClose, images }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const windowSize = useWindowSize();

  useEffect(() => {
    // Disable vertical scrolling
    document.body.style.overflowY = 'hidden';
    document.body.style.overflowX = 'hidden';

    // Cleanup function to reset the overflow style
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  const handlePrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#021342] flex flex-col justify-center text-white z-[3000] w-[100vw] h-[100vh] overflow-hidden">
      <button className="absolute top-2 right-5" onClick={onClose}>
        <XMarkIcon className="w-8" />
      </button>
      {windowSize.width >= 768 ? (
        <>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation
            className="swiper-container custom-swiper w-[70%] h-[80%] rounded flex items-center"
            style={{ scrollBehavior: 'smooth' }}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Image ${index}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex items-end justify-end items-center mx-12 mt-[-25px] mb-[-30px]">
            <p>
              <img
                src={prev}
                onClick={handlePrev}
                className="p-0 w-[7rem] h-[4rem]  cursor-pointer"
                alt=""
              />
            </p>
            <p>
              {currentIndex + 1} / {images.length}
            </p>
            <p>
              <img
                src={next}
                onClick={handleNext}
                className="p-0 w-[7rem] h-[4rem] cursor-pointer"
                alt=""
              />
            </p>
          </div>
        </>
      ) : (
        <div className="flex mx-auto flex-col w-[90%] h-[80%] overflow-y-auto">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className="w-full h-auto object-cover mb-4"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Photos;
