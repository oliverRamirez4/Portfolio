import Link from "next/link";
import { profile } from "@/lib/profile";

export default function Home() {
  return (
    <section>
      <h1 className="font-sans text-[25px] font-medium">My Portfolio</h1>
      <p className="mt-4 max-w-[30rem] text-[16px] font-normal">{profile.about}</p>
      <p className="mt-4 flex gap-4">
        <Link href="/resume">Resume</Link>
        <Link href="/projects">Projects</Link>
      </p>
    </section>
  );
}
