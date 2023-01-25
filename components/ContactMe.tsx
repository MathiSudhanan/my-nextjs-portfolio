import React from "react";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMediaQuery } from "../hooks/MediaQuery";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Props = {};

const ContactMe = ({}: Props) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    window.location.href = `mailto:mathisudhanan@gmail.com?subject=${formData.subject}&body=Hi, My name is ${formData.name}, 
    ${formData.message} (${formData.email})`;
  };

  const isLandscape = useMediaQuery("(orientation: landscape)");
  const isSmall = useMediaQuery("(max-height: 500px)");
  let sectionClass =
    "xl:h-screen  flex relative xl:overflow-hidden flex-col text-left md:flex-row max-w-7xl top-1 bottom-40 md:py-0 justify-evenly mx-auto items-center";
  if (isSmall) {
    sectionClass += " h-fit";
  } else {
    sectionClass += " h-screen";
  }
  console.log(sectionClass);

  return (
    <div className={sectionClass}>
      <h3 className="md:absolute top-24 uppercase md:tracking-[20px] tracking-[15px] text-gray-500 text-2xl">
        Contact Me
      </h3>
      <div className="relative flex flex-col flex-wrap space-y-5  lg:space-y-10 md:mt-36">
        <h4 className="relative px-12 text-1xl lg:text-4xl font-semibold text-center">
          I have got what you need.{" "}
          <span className="decoration-[#F7AB0A]/50 underline">
            Let&apos;s Talk.
          </span>
        </h4>

        <div className="space-y-5 md:space-y-10">
          <div className="flex items-center md: space-y-3 space-x-5 justify-center">
            <PhoneIcon className="text-[#F7AB0A] h-6 w-65 md:h-7 md:w-7 animate-pulse" />
            <p className="text-1xl lg:text-2xl">+91 9629581508</p>
          </div>

          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="text-[#F7AB0A] h-6 w-6 md:h-7 md:w-7 animate-pulse" />
            <p className="text-1xl lg:text-2xl">mathisudhanan@gmail.com</p>
          </div>

          <div className="flex items-center space-x-5 justify-center">
            <MapPinIcon className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
            <p className="text-1xl lg:text-2xl">1/13 Satheeswara Nagar</p>

            {/* <div className="flex flex-col items-start">
            <p className="text-2xl">Vellalore (po)</p>
            <p className="text-2xl">Coimbatore-111</p>
          </div> */}
          </div>
          <form
            className="flex flex-col space-y-2 w-fit mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
              <input
                {...register("name")}
                placeholder="Name"
                className="contactInput"
                type="text"
              />
              <input
                {...register("email")}
                placeholder="Email"
                className="contactInput"
                type="email"
              />
            </div>
            <input
              {...register("subject")}
              type="text"
              className="contactInput"
              placeholder="subject"
            />
            <textarea
              {...register("message")}
              className="contactInput"
              placeholder="Message"
            />
            <button className="submitButton" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
