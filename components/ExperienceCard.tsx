import { motion } from "framer-motion";
import React from "react";
import { urlFor } from "../sanity";
import { Experience } from "../typings";

type Props = {
  experience: Experience;
};

const ExperienceCard = ({ experience }: Props) => {
  return (
    <article
      className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[700px] 
    md:w-[600px] xl:w-[900xl] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden"
    >
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
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
