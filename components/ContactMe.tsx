import React from "react";

type Props = {};

const ContactMe = ({}: Props) => {
  return (
    <div
      className="h-screen flex relative overflow-hidden flex-col text-left
        md:flex-row max-w-full justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Contact Me
      </h3>
    </div>
  );
};

export default ContactMe;
