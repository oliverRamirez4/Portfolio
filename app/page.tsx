import Link from "next/link";
import { profile } from "@/lib/profile";

export default function Home() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">My Portfolio</h1>
      <p>{profile.about}</p>
      <p className="mt-6 flex gap-4">
        <Link href="/resume">Resume</Link>
        <Link href="/projects">Projects</Link>
      </p>
    </section>
  );
}
