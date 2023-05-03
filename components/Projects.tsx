import { motion } from "framer-motion"
import React from 'react'
import { useMediaQuery } from "../hooks/MediaQuery";
import { Project } from "../typings";
import Carousel from "./Carousel/Carousel";
import { urlFor } from "../sanity";
import ProjectCard from "./ProjectCard/ProjectCard";

type Props = {
    projects: Project[];
};
  
const Projects = ({ projects }: Props) => {
    const isSmall = useMediaQuery("(max-height: 500px)");

    const isLandscape = useMediaQuery("(orientation: landscape)");
    
    let sectionClass = 'relative top-24 mx-auto flex flex-col items-center mx-auto';
    sectionClass += isLandscape ? ' h-fit' : ' h-screen';
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
            <h3 className=" text-center uppercase tracking-[20px] text-gray-500 text-2xl">
                Projects
            </h3>
          
            {projects?.map((project, index) => {
                return (
                    <ProjectCard key={project._id} project={project} />
                )
            })}
            
        </motion.div>
    );
}

export default Projects