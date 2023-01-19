import { motion } from "framer-motion";
import React from "react";
import { useMediaQuery } from "../hooks/MediaQuery";
import skill from "../sanity-project/schemas/skill";
import { Skill as WorkSkill } from "../typings";
import Skill from "./Skill";

type Props = {
  skills: WorkSkill[];
};

const Skills = ({ skills }: Props) => {
  const isSmall = useMediaQuery("(min-width: 480px)");
  // const useIsMedium = () => useMediaQuery("(min-width: 768px)");
  return (
    <motion.div
      initial={{
        opacity: isSmall ? 1 : 0,
      }}
      transition={{
        duration: 1.5,
      }}
      whileInView={{
        opacity: 1,
      }}
      className="flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center"
    >
      <h3 className="md:absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Skills
      </h3>
      <h3 className="md:absolute top-36 uppercase tracking-[3px] mt-5 md:mt-0 text-gray-500 text-sm">
        Hover over a skill for proficiency
      </h3>
      <div className="grid grid-cols-4 gap-3 md:gap-5 mt-5 md:mt-0">
        {skills?.slice(0, skills.length / 2).map((skill) => {
          return <Skill key={skill._id} skill={skill} directionRight />;
        })}

        {skills?.slice(skills.length / 2, skills.length).map((skill) => {
          return <Skill key={skill._id} skill={skill} directionLeft />;
        })}
      </div>
    </motion.div>
  );
};

export default Skills;
