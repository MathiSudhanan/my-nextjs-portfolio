import { motion } from "framer-motion";
import React from "react";
import { useMediaQuery } from "../hooks/MediaQuery";
import { Experience } from "../typings";
import ExperienceCard from "./ExperienceCard";

type Props = {
  experiences: Experience[];
};

const WorkExperience = ({ experiences }: Props) => {
  const isSmall = useMediaQuery("(max-height: 500px)");
  const isMed = useMediaQuery("(min-width: 768px)");

  const isLandscape = useMediaQuery("(orientation: landscape)");
  let sectionClass =
    "pt-20 relative h-fit xl:h-screen  text-center md:text-left md:flex-row max-w-7xl px-10  mx-auto items-center";

  // "md:mt-24 pt-20  h-screen xl:h-screen flex flex-col relative md:overflow-hidden text-left max-w-full md:justify-evenly md:mx-auto md:items-center";
  // if (isSmall || (!isMed && !isLandscape)) {
  //   sectionClass += " h-fit";
  // } else {
  //   sectionClass += " h-screen";
  // }
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
        }}
        transition={{
          duration: 1.5,
        }}
        whileInView={{
          opacity: 1,
        }}
        className={sectionClass}
      >
        <div className=" flex  items-center justify-center">
          <h3 className=" xl:top-24 tracking-[20px] uppercase text-gray-500 text-2xl">
            Experience
          </h3>
        </div>
        <div className="mt-5 w-full flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 overflow-x-scroll xl:p-10 md:snap-x md:snap-mandatory md:mt-20 xl:mt-40 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">
          {experiences?.map((experience) => {
            return (
              <ExperienceCard key={experience._id} experience={experience} />
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default WorkExperience;
