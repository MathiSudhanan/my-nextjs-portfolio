import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import About from "../components/About";
import ContactMe from "../components/ContactMe";
import WorkExperience from "../components/WorkExperience";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import { Experience, PageInfo, Project, Skill, Social } from "../typings";
import { fetchPageInfo } from "../Utils/fetchPageInfo";
import { fetchExperiences } from "../Utils/fetchExperiences";
import { fetchProjects } from "../Utils/fetchProjects";
import { fetchSkills } from "../Utils/fetchSkills";
import { fetchSocials } from "../Utils/fetchSocials";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
};

export default function Home({
  pageInfo,
  projects,
  experiences,
  skills,
  socials,
}: Props) {
  return (
    <div
      className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory 
    overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80"
    >
      <Head>
        <title>Mathisudhanan Portfolio</title>
      </Head>

      <Header socials={socials} />

      {/*Hero*/}
      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} />
      </section>

      {/*About*/}
      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>

      {/*Experience*/}
      <section id="experience" className="snap-start">
        <WorkExperience experiences={experiences} />
      </section>

      {/*Skills*/}
      <section id="skills" className="snap-start">
        <Skills skills={skills} />
      </section>
      {/*Projects*/}
      <section id="projects" className="snap-start">
        <Projects projects={projects} />
        
      </section>

      {/*Contact Me*/}
      <section id="contact" className="snap-end">
        <ContactMe />
      </section>

      <Link href="#hero" legacyBehavior>
        <footer className="sticky bottom-14 xl:bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <img
              className="h-10 w-10 rounded-full bg-gray-500 filter grayscale hover:grayscale-0 cursor-pointer"
              src="/Images/me-removebg-preview.png"
              alt="Home"
            />
          </div>
        </footer>
      </Link>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo = await fetchPageInfo();
  const experiences = await fetchExperiences();
  const projects = await fetchProjects();
  const skills = await fetchSkills();
  const socials = await fetchSocials();

  return {
    props: {
      pageInfo,
      experiences,
      projects,
      skills,
      socials,
    },
    revalidate: 10,
  };
};
