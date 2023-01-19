import { motion } from "framer-motion";
import React from "react";
import { Experience } from "../typings";
import ExperienceCard from "./ExperienceCard";

type Props = {
  experiences: Experience[];
};

const WorkExperience = ({ experiences }: Props) => {
  return (
    <motion.div
      // initial={{
      //   opacity: 0,
      // }}
      // transition={{
      //   duration: 1.5,
      // }}
      // whileInView={{
      //   opacity: 1,
      // }}
      className="md:pt-0 md:h-screen relative md:overflow-hidden text-left
        max-w-full md:justify-evenly md:mx-auto md:items-center"
    >
      <div className=" pt-20 flex  items-center justify-center">
        <h3 className="top-24 tracking-[20px] uppercase text-gray-500 text-2xl">
          Experience
        </h3>
      </div>
      <div className="w-full flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 overflow-x-scroll p-10 md:snap-x md:snap-mandatory md:mt-40 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">
        {experiences?.map((experience) => {
          return (
            <ExperienceCard key={experience._id} experience={experience} />
          );
        })}
      </div>
    </motion.div>
  );
};

export default WorkExperience;
