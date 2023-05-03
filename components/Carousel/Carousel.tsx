import React, { useEffect, useState } from 'react'
import { Image } from "../../typings";
import { urlFor } from "../../sanity";

import LeftArrow from "./icons/LeftArrow";
import RightArrow from "./icons/RightArrow";
import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/MediaQuery";

interface slideProps{
  images: Image[];
  duration?: number;
  width?: string;
  height?: string;
}

const Carousel = ({ images, duration, width, height }: slideProps) => {

  const isSmall = useMediaQuery("(min-width: 500px)");
  console.log(`isSmall ${isSmall}`);
  const isLandscape = useMediaQuery("(orientation: landscape)");
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const index = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  }
  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const index = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index);    
  }

  useEffect(() => {
    if (duration) {
      const interval = setTimeout(() => {
        nextSlide();
      }, duration);    

      return () => clearTimeout(interval);
    }
  }, [currentIndex])
  
  
  return (
    <motion.div
    initial={{
      y: -300,
      //opacity: isSmall ? 1 : 0,
    }}
    transition={{
      duration: 1.2,
    }}
    whileInView={{
      y: 0,
      opacity: 1,
      width: width ? width:  isSmall ? '90vw': '60%',
      height:height? height: isSmall? '20vh': '50%'
    }}
    viewport={{
      once: true,
      }}>
      

    
    {/* <div className="max-h-[90%]  sm:h-[50%] md:h-[600px] sm:w-[90%] md:w-[60%]   sm:m-5 md:m-auto md:px-4 relative group"> */}
        <img
          src={urlFor(images[currentIndex]).url()} alt=""
          className="w-full h-full rounded-2xl" />
      <div className="absolute rounded-full opacity-9 bg-gray-200 hidden group-hover:block top-[50%] -translate-x-0 -translate-y-[-50%] md:left-5 sm:left-3 text-black cursor-pointer">
        <LeftArrow onClickHandler={prevSlide} />
      </div>
      <div className="absolute rounded-full opacity-9 bg-gray-200 hidden group-hover:block top-[50%] -translate-x-0 -translate-y-[-50%] right-5 text-black cursor-pointer">
        <RightArrow onClickHandler={nextSlide} />
      </div>
      <div className="relative flex justify-center align center top-5 ">
        {
          images.map((item, index) => {
            return (
              <div key={index} onClick={() => goToSlide(index)} className="px-1 py-5" >
                <div className={`${(index===currentIndex? "bg-gray-600":"bg-[#F7AB0A]")} rounded-full w-2 h-2  hover:bg-gray-800 cursor-pointer`}></div>
              </div>
            );
          })
        }
      </div>
      {/* </div> */}
      </motion.div>
  );
};

export default Carousel