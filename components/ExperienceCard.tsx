import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "../hooks/MediaQuery";
import { urlFor } from "../sanity";
import { Experience } from "../typings";

type Props = {
  experience: Experience;
};

const ExperienceCard = ({ experience }: Props) => {
  

  const isSmall = useMediaQuery("(min-width: 480px)");
  // const useIsMedium = () => useMediaQuery("(min-width: 768px)");
  
  return (
    <article
      className="relative flex flex-col ml-0 rounded-lg items-center md:space-y-7 flex-shrink-0 w-[98%]
    md:w-[600px] xl:w-[900xl] snap-center bg-[#292929] p-2 md:p-10 md:hover:opacity-100 md:opacity-40 cursor-pointer 
    md:transition-opacity md:duration-200 md:overflow-hidden"
    >
      <motion.img
        initial={
          isSmall
            ? { opacity: 1 }
            : {
                y: -100,
                opacity: 0,
              }
        }
        transition={{
          duration: 1.2,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        src={urlFor(experience.companyImage).url()}
        // className="bg-gray-300  w-32 h-32 rounded-full object-cover object-center  xl:w-[200px] xl:h-[200px]"
        className="bg-gray-300  w-32 h-32 rounded-full object-cover object-center"
      />
      <div className="px-0 md:px-10">
        <h4 className="text-3xl font-light">{experience.jobTitle}</h4>
        <p className="font-bold text-2xl mt-4">{experience.company}</p>
        <div className="flex space-x-2 my-4 flex-wrap">
          {experience.technologies?.map((tech) => {
            return (
              <img
                key={tech._id}
                src={urlFor(tech.image).url()}
                className="h-10 w-10 rounded-full"
                alt=""
              />
            );
          })}
        </div>
        <p className="uppercase py-5 text-gray-300">
          {`${experience.dateStarted} - ${
            experience.dateEnded ? experience.dateEnded : "CURRENT"
          }`}
        </p>
        <ul
          className="list-disc space-y-4 ml-5 text-lg h-96 max-w-56 overflow-y-scroll 
        scrollbar-thin scrollbar-track-black scrollbar-thumb-[#F7AB0A]/80"
        >
          {experience.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ExperienceCard;
