import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer>
      <div className="flex gap-[25px]">
        <a
          href="https://www.linkedin.com/in/oliver-ramirez04/"
          target="_blank"
          rel="noreferrer"
          className="text-current"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/oliverRamirez4"
          target="_blank"
          rel="noreferrer"
          className="text-current"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}
