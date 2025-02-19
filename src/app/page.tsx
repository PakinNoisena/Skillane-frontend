"use client";

import { useEffect, useState } from "react";
import Profile from "@/components/profile";
import ProfileEdit from "@/components/profile-edit";
import { AnimatePresence } from "framer-motion";
import { useUserManagementStore } from "@/stores/user.store";
import { UserManagement } from "@/services/models/user.model";

export default function Home() {
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [localUserProfile, setLocalUserProfile] =
    useState<UserManagement | null>();

  const { getUserProfile, userProfile } = useUserManagementStore();

  useEffect(() => {
    setLocalUserProfile(userProfile);
    if (userProfile?.isFirstEdit === false) {
      setShowProfileEdit(true);
    }
  }, [userProfile]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      await getUserProfile();
    };
    fetchUserProfile();
  }, []);

  return (
    <section>
      <Profile setHide={setShowProfileEdit} />
      {/* <ProfileEdit /> */}
      <AnimatePresence>
        {showProfileEdit && (
          <ProfileEdit
            onClose={() => setShowProfileEdit(false)}
            userProfileInfo={localUserProfile ?? ({} as UserManagement)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
