import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { Project } from "../typings";
import { urlFor } from "../sanity";
import { useMediaQuery } from "../hooks/MediaQuery";
import LeftArrow from "./Carousel/icons/LeftArrow";
import RightArrow from "./Carousel/icons/RightArrow";
import Carousel from "./Carousel/Carousel";

type Props = {
  projects: Project[];
};

const ProjectsCopy = ({ projects }: Props) => {
  const isSmall = useMediaQuery("(max-height: 500px)");

  const isLandscape = useMediaQuery("(orientation: landscape)");
  let sectionClass =
    "md:h-fit xl:h-screen relative flex xl:overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0";
  if (isSmall) {
    sectionClass += " h-fit";
  } else {
    sectionClass += " h-screen";
  }

  return (
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
      <h3 className="relative md:absolute top-36 md:top-12 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>
      <div
        className="w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 
      scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80"
      >
        {projects?.map((project, index) => {
          return (
            <div
              key={project._id}
              className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 
              items-center justify-center p-20 xl:p-44 xl:h-screen h-fit"
            >
              
              <Carousel images={project.images} duration={6000}/>
              <div className="relative sm:space-y-2 md:space-y-5 px-0 md:px-5 max-w-6xl">
                <h4 className="text-2xl  md:text-3xl font-semibold text-center">
                  <span className="underline decoration-[#F7AB0A] ">
                    Case Study {index + 1} of {projects.length}:
                  </span>{" "}
                  {project.title}
                </h4>
                <div className="flex items-center space-x-2 justify-center  ">
                  {project.technologies?.map((tech) => {
                    return (
                      <img
                        key={tech._id}
                        src={urlFor(tech.image).url()}
                        className="rounded-full h-10 w-10"
                        alt=""
                        // width={10}
                        // height={10}
                      />
                    );
                  })}
                </div>
                <p className="text-lg md:text-center text-left">
                  {project.summary}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
};

export default ProjectsCopy;