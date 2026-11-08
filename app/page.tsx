import Link from "next/link";
import { profile } from "@/lib/profile";

export default function Home() {
  return (
    <section>
      <div className="max-w-[30rem] text-[16px] font-normal">
        <h1 className="greeting-settle relative inline-block font-sans text-[25px] font-medium leading-none text-ink">
          {profile.greeting}
        </h1>{" "}
        {profile.about}
      </div>
      <p className="mt-4 flex gap-4">
        <Link href="/resume">Resume</Link>
        <Link href="/projects">Projects</Link>
      </p>
    </section>
  );
}
