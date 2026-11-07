import { existsSync } from "node:fs";
import path from "node:path";

const resumeUrl = "/oliver-ramirez-resume.pdf";
const resumePosted = existsSync(path.join(process.cwd(), "public", "oliver-ramirez-resume.pdf"));

export default function ResumePage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Resume</h1>
      {resumePosted ? (
        <>
          <p className="mb-4">
            <a href={resumeUrl} target="_blank" rel="noreferrer">
              Open the PDF
            </a>
          </p>
          <iframe
            src={resumeUrl}
            title="Oliver Ramirez resume"
            className="relative left-1/2 h-[80vh] w-[min(56rem,calc(100vw-2rem))] -translate-x-1/2 border-0"
          />
        </>
      ) : (
        <p>The resume is not available yet.</p>
      )}
    </section>
  );
}
