"use client";
import Image from "next/image";
import ProfileCard from "@/components/profile-card";

export default function Home() {
  return (
    <section>
      <div className="w-full h-[40vh] relative bg-dark-green">
        <Image
          src="/images/skillane-logo.png"
          alt="skillane logo"
          width={80}
          height={80}
          className="object-cover rounded-full absolute top-10 left-10"
        />
      </div>
      <ProfileCard />
    </section>
  );
}
