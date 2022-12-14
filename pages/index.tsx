import Head from "next/head";
import Image from "next/image";
import About from "../components/About";
import ContactMe from "../components/ContactMe";
import Experience from "../components/Experience";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-scroll z-0">
      <Head>
        <title>Mathisudhanan Portfolio</title>
      </Head>

      <Header />

      {/*Hero*/}
      <section id="hero" className="snap-start">
        <Hero />
      </section>

      {/*About*/}
      <section id="about" className="snap-center">
        <About />
      </section>

      {/*Experience*/}
      <section id="experience" className="snap-center">
        <Experience />
      </section>

      {/*Skills*/}
      <section id="skills" className="snap-start">
        <Skills />
      </section>
      {/*Projects*/}
      <section id="projects" className="snap-start">
        <Projects />
      </section>

      {/*Contact Me*/}
      <section id="contact-me" className="snap-center">
        <ContactMe />
      </section>
    </div>
  );
}
