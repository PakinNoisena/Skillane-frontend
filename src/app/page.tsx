"use client";

import { useEffect, useState } from "react";
import Profile from "@/components/profile";
import ProfileEdit from "@/components/profile-edit";
import { AnimatePresence } from "framer-motion";
import { useUserManagementStore } from "@/stores/user.store";
import { UserManagement } from "@/services/models/user.model";
import { useAuthManagementStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [localUserProfile, setLocalUserProfile] =
    useState<UserManagement | null>(null);

  const { getUserProfile, userProfile } = useUserManagementStore();
  const { accessToken, loadTokenFromCookie } = useAuthManagementStore();

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      await loadTokenFromCookie();
      setIsHydrated(true);
    };
    loadToken();
  }, []);

  // **Wait for both hydration and token to load before redirecting**
  useEffect(() => {
    if (isHydrated) {
      if (!accessToken) {
        console.warn("No access token found, redirecting...");
        router.push("/signin");
      } else {
        getUserProfile();
      }
    }
  }, [isHydrated, accessToken, router]);

  useEffect(() => {
    setLocalUserProfile(userProfile);
    if (userProfile?.isFirstEdit === false) {
      setShowProfileEdit(true);
    }
  }, [userProfile]);

  return (
    <section>
      <Profile setHide={setShowProfileEdit} />
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
