"use client";

import { useEffect, useState } from "react";
import Profile from "@/components/profile";
import ProfileEdit from "@/components/profile-edit";

export default function Home() {
  // State to control visibility
  const [hide, setHide] = useState(false);

  return (
    <section>
      <Profile hide={hide} setHide={setHide} />
      {/* <ProfileEdit /> */}
    </section>
  );
}
