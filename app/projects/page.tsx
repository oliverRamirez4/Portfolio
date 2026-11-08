import type { IconType } from "react-icons";
import { FaArrowUpRightFromSquare, FaGithub, FaJava } from "react-icons/fa6";
import {
  SiD3Dotjs,
  SiFlask,
  SiHuggingface,
  SiMapbox,
  SiMysql,
  SiNextdotjs,
  SiNumpy,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiSpacy,
  SiTypescript,
} from "react-icons/si";
import { openHref, projects, type Skill } from "@/lib/projects";

const marks: Partial<Record<Skill, IconType>> = {
  Python: SiPython,
  Postgres: SiPostgresql,
  TypeScript: SiTypescript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  D3: SiD3Dotjs,
  Mapbox: SiMapbox,
  Flask: SiFlask,
  "Hugging Face": SiHuggingface,
  spaCy: SiSpacy,
  "scikit-learn": SiScikitlearn,
  NumPy: SiNumpy,
  Java: FaJava,
  MySQL: SiMysql,
};

export default function Page() {
  if (projects.length === 0) {
    return (
      <section>
        <h1 className="font-sans text-[25px] font-medium">Projects</h1>
        <p className="mt-4 text-[16px] font-normal">There are no projects yet.</p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="font-sans text-[25px] font-medium">Projects</h1>
      <div className="mt-[25px] flex flex-col gap-4">
        {projects.map((project) => {
          const href = openHref(project);
          return (
            <article key={project.shortName} className="border border-stone bg-paper p-4">
              <h2 className="font-sans text-[20px] font-medium text-ink">{project.title}</h2>
              <p className="mt-4 text-[16px] font-normal text-ink">{project.summary}</p>
              {project.skills.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-4">
                  {project.skills.map((skill) => {
                    const Mark = marks[skill];
                    return (
                      <li key={skill} className="flex items-center gap-2 font-mono text-[13px] font-normal text-ink">
                        {Mark ? <Mark aria-hidden="true" className="text-ink" color="currentColor" size={13} /> : null}
                        {skill}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
              {project.image ? (
                <img src={project.image} alt={project.title} className="mt-4 w-full object-contain" />
              ) : null}
              <div className="mt-4 flex gap-4">
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-current"
                  aria-label={`${project.title} on GitHub`}
                >
                  <FaGithub aria-hidden="true" />
                </a>
                {href ? (
                  <a href={href} className="text-current" aria-label={`Open ${project.title}`}>
                    <FaArrowUpRightFromSquare aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
