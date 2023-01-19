import { motion } from "framer-motion";
import React from "react";
import { useMediaQuery } from "../hooks/MediaQuery";
import { urlFor } from "../sanity";
import { Skill as WorkSkill } from "../typings";

type Props = {
  directionLeft?: boolean;
  directionRight?: boolean;
  skill: WorkSkill;
};

const Skill = ({ directionLeft, skill }: Props) => {
  const isSmall = useMediaQuery("(min-width: 480px)");
  // const useIsMedium = () => useMediaQuery("(min-width: 768px)");
  return (
    <div className="group relative flex cursor-pointer">
      <motion.img
        initial={{
          x: directionLeft ? -200 : 200,
          opacity: 1, //isSmall ? 1 : 0,
        }}
        transition={{
          duration: 1,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        transformTemplate={({ x, rotate }) => "none"}
        src={urlFor(skill.image).url()}
        // className="rounded-full border border-gray-500 object-cover h-24 w-24 xl:w-32 xl:h-32 filter group-hover:grayscale transition duration-300 ease-in-out"
        className="rounded-full border border-gray-500 object-cover h-16 w-16 filter group-hover:grayscale transform-none md:transition duration-300 ease-in-out"
      />
      <div
        //   className="absolute opacity-0 group-hover:opacity-80 group-hover:bg-white h-24 w-24 md:h-28
        // md:w-28 xl:w-32 xl:h-32 rounded-full transition duration-300 ease-in-out"

        className="absolute opacity-0 group-hover:opacity-80 group-hover:bg-white h-16 w-16  rounded-full transition duration-300 ease-in-out"
      >
        <div className="flex items-center justify-center h-full z-0">
          <p className="text-3xl font-bold text-black opacity-100">
            {skill.progress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skill;
