import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { Project } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  projects: Project[];
};

const Projects = ({ projects }: Props) => {
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
      className="md:h-screen relative flex md:overflow-hidden flex-col text-left 
      md:flex-row max-w-full justify-evenly mx-auto items-center z-0"
    >
      <h3 className="md:absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>
      <div
        className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 
      scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80"
      >
        {projects?.map((project, index) => {
          return (
            <div
              key={project._id}
              className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 
              items-center justify-center p-20 md:p-44 md:h-screen"
            >
              <motion.img
                initial={{
                  y: -300,
                  opacity: 0,
                }}
                transition={{
                  duration: 1.2,
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                }}
                src={urlFor(project.image).url()}
                // className="bg-gray-300  w-32 h-32 rounded-full object-cover object-center  xl:w-[200px] xl:h-[200px]"
                className="bg-gray-300 w-32 h-32  object-cover object-center  xl:w-[700px] xl:h-[400px]"
              />
              <div className="space-y-10 px-0 md:px-10 max-w-6xl">
                <h4 className="text-2xl  md:text-4xl font-semibold text-center">
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
                  {/* Permissions contains Permissions API and Permission UI which
                  is MERN stack Application.
                 
                  Permissions API contains tech stack of Express API, Prisma
                  Client and Mongo DB. Permission UI contains tech stack of
                  React, TypeScript, Redux Toolkit, Axios. 
                  Permissions is a data entitlement project. It deals with the
                  permissions at data level. This is a sample project with few
                  complexities(fund Report date Permissions, Portfolio
                  permissions and Portfolio Report Date Permissions has been
                  removed) reduced due to time. The permissions can be applied
                  to stat level, category level, fund level, client fund level
                  along with combination of Company, User Group, User with Water
                  flow logic.*/}
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

export default Projects;
