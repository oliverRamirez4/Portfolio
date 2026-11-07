import Card from "@mui/material/Card";
import { CardMedia } from "@mui/material";
import GitHub from "@mui/icons-material/GitHub";
import InsertLink from "@mui/icons-material/InsertLink";
import { openHref, projects } from "@/lib/projects";

export default function Page() {
  if (projects.length === 0) {
    return (
      <section>
        <h1 className="text-2xl font-bold mb-6">Projects</h1>
        <p>There are no projects yet.</p>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 px-0 gap-4">
      {projects.map((project) => {
        const href = openHref(project);
        return (
          <Card key={project.shortName} sx={{ width: 1, height: project.image ? 275 : "auto" }} className="flex flex-col items-center">
            <h1 className="text-xl font-medium">{project.title}</h1>
            <div className={project.image ? "grid grid-cols-2 px-2 flex-grow" : "px-2"}>
              <div className="text-xs overflow-y-auto pr-2 h-full" style={{ maxHeight: project.image ? "215px" : undefined }}>
                <p>{project.summary}</p>
                {project.skills.length > 0 ? <p className="mt-2">{project.skills.join(", ")}</p> : null}
              </div>
              <div className="flex flex-col items-center">
                {project.image ? (
                  <CardMedia
                    component="img"
                    alt={project.title}
                    image={project.image}
                    sx={{ width: 275, height: 190, objectFit: "contain" }}
                  />
                ) : null}
                <div className="flex justify-center gap-6 mt-2 items-center">
                  <a href={project.repositoryUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} repository`}>
                    <GitHub sx={{ transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.5)" }, scale: 1.5 }} />
                  </a>
                  {href ? (
                    <a href={href} aria-label={`Open ${project.title}`}>
                      <InsertLink sx={{ transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.5)" }, scale: 1.5 }} />
                      {project.onSite ? <span className="sr-only">Opens on this site</span> : null}
                    </a>
                  ) : null}
                </div>
                {project.onSite ? <p className="text-xs mt-1">Opens on this site</p> : null}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
