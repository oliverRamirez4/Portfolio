import { profile } from "@/lib/profile";

export default function Home() {
  return (
    <section>
      <div className="mx-auto max-w-[30rem] text-center text-[16px] font-normal">
        <h1 className="greeting-settle relative inline-block font-sans text-[25px] font-medium leading-none text-ink">
          {profile.greeting}
        </h1>{" "}
        {profile.about}
      </div>
    </section>
  );
}
