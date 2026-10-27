import React from 'react'
import { Project } from "../../typings";
import Carousel from "../Carousel/Carousel";
import { urlFor } from "../../sanity";

type Props = {
    project: Project;
};
  

const ProjectCard = ({ project }: Props) => {
  return (

      <div className=" bg-white opacity-100 h-[70%] md:h-[42rem] w-[90%] md:w-[40rem] my-[2.5rem] mx-[0.625] p-[1rem] cursor-pointer shadow-xl shadow-black m-[2rem] rounded-[2rem] group ">
        <div className="bg-[#292929] relative h-[30rem] z-[1000]  rounded-b-[.625rem] group-hover:mt-[-70%] max-xs:group-hover:mt-[-120%] transition-all shadow-xl shadow-black ">
          <Carousel images={project.images} duration={1500} width="100%" height="80%" />  
        </div>
        <div className= "text-[#858792] my-[1rem] mx-0 overflow-hidden mt-[-12.5rem] opacity-0 invisible group-hover:visible transition-all duration-[500] ease-in-out group-hover:mt-0 group-hover:opacity-100 p-[2rem]">
          <h1 className="text-3xl my-[0.6rem] mx-auto text-center w-full">{project.title}</h1>
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
          <p className="max-xs:text-xs text-md py-10 line-height-[1.8rem] md:tracking-[1px] text-center">{project.summary}</p>
        </div>
      </div>
  );
}

export default ProjectCard