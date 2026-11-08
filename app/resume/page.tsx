import { existsSync } from "node:fs";
import path from "node:path";

const resumeUrl = "/oliver-ramirez-resume.pdf";
const resumePosted = existsSync(path.join(process.cwd(), "public", "oliver-ramirez-resume.pdf"));

export default function ResumePage() {
  return (
    <section>
      <h1 className="font-sans text-[25px] font-medium">Resume</h1>
      {resumePosted ? (
        <>
          <p className="mt-4">
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="text-current">
              Open the PDF
            </a>
          </p>
          <iframe
            src={resumeUrl}
            title="Oliver Ramirez resume"
            className="mt-4 block h-[80vh] w-full border-0 bg-paper"
          />
        </>
      ) : (
        <p className="mt-4 text-[16px] font-normal">The resume is not available yet.</p>
      )}
    </section>
  );
}
