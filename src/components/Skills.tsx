import { motion } from "framer-motion";
import React from "react";
import { useMediaQuery } from "../hooks/MediaQuery";

import { Skill as WorkSkill } from "../typings";
import Skill from "./Skill";

type Props = {
  skills: WorkSkill[];
};

const Skills = ({ skills }: Props) => {
  // const isSmall = useMediaQuery("(min-width: 480px)");

  const isSmall = useMediaQuery("(max-height: 500px)");

  const isLandscape = useMediaQuery("(orientation: landscape)");
  let sectionClass = "pt-20 md:pt-20 relative h-fit  text-center md:text-left md:flex-row  px-10 xl:px-10 items-center";
  if (isSmall) {
    sectionClass += " h-fit md:pt-0";
  } else {
    sectionClass += " h-screen";
  }
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
      // className="pt-20 flex relative flex-col text-center md:text-left xl:flex-col max-w-[2000px] xl:px-10 h-screen xl:h-screen xl:space-y-0 mx-auto  items-center"
      className={sectionClass}
    >
      <div className="w-full flex justify-center">
        <h3 className="mt-10  uppercase tracking-[20px] text-gray-500 text-2xl">
          Skills
        </h3>
      </div>
      <div className="w-full flex justify-center">
        <h3 className="md:mt-10  top-36 uppercase tracking-[3px] mt-5  text-gray-500 text-sm">
          Hover over a skill for proficiency
        </h3>
      </div>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-5 mt-5 md:mt-10">
          {skills?.slice(0, skills.length / 2).map((skill) => {
            return <Skill key={skill._id} skill={skill} directionRight />;
          })}

          {skills?.slice(skills.length / 2, skills.length).map((skill) => {
            return <Skill key={skill._id} skill={skill} directionLeft />;
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
