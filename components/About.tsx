import React from 'react'
import {motion} from 'framer-motion'

const About = () => {
  return (
    <motion.div 
    initial={{
        
        opacity:0
       }}
       transition={{
        duration:1.5,
       }}
       whileInView={{
        opacity:1
       }}
    className='flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center'>
       <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>About</h3>
       <motion.img initial={{
        x:-200,
        opacity:0
       }}
       transition={{
        duration:2.5,
       }}
       whileInView={{
        opacity:1, x:0
       }}
       src="/Images/me-removebg-preview.png"
       className='bg-gray-300 -mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]'
       />
       <div className='space-y-10 px-0 md:px-10'>
        <h4 className='text-4xl font-semibold'>Here is a <span className='underline decoration-[#FBAB07]/50'>little</span> background</h4>
        <p className='tracking-[3px] text-[1.1em]'>
            Innovative, task-driven professional with 15+ years of experience in web design and development across various industries. 
        Equipped with success in consistently identifying and providing technological needs of companies through ingenious innovation.
        </p>
        <p className='text-base tracking-[3px]'>
            Proficient in architecting application which includes developing databases, creating different layers, creating rest API, 
            user interfaces with Responsive UI, writing and testing codes following clean code practices and TDD. 
            Troubleshooting simple/complex issues and implementing new features based on the requirement and user feedback.
        </p>
       </div>
    </motion.div>
  )
}

export default About