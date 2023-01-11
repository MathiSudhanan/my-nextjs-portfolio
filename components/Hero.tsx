import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import mathi from "../Images/me-removebg-preview.png";
import Image from "next/image";
import Link from "next/link";
import { PageInfo } from "../typings";
import { urlFor } from "../sanity";

const myLoader = ({
  src,
  width,
  quality,
}: {
  src: any;
  width?: any;
  quality?: any;
}) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

type Props = {
  pageInfo: PageInfo;
};

const Hero = ({ pageInfo }: Props) => {
  const [text, count] = useTypewriter({
    words: [
      `Hi, I'm ${pageInfo?.name}`,
      "Full-Stack Developer",
      "Loves Coding & Martial Arts",
    ],
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />

      <img
        src={urlFor(pageInfo.heroImage).url()}
        className="relative rounded-full h-32 w-32 mx-auto object-cover bg-gray-300"
        alt="Picture of the author"
      />
      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
          {pageInfo.role}
        </h2>
        <h1 className="text-5xl lg:text-6xl font-semibold px-10">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>
        <div className="pt-5">
          <Link href="#about" className="border-none">
            <button className="heroButton">About</button>
          </Link>
          <Link href="#experience" className="border-none">
            <button className="heroButton">Experience</button>
          </Link>
          <Link href="#skills" className="border-none">
            <button className="heroButton">Skills</button>
          </Link>
          <Link href="#projects" className="border-none">
            <button className="heroButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
