"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import IconAction from "@/components/icon-action";
import { useUserManagementStore } from "@/stores/user.store";
import { UserManagement } from "@/services/models/user.model";
import { getAge } from "@/utils/age";
import authRepository from "@/services/repositories/auth.repository";
import { useAuthManagementStore } from "@/stores/auth.store";

interface ProfileProps {
  hide: boolean;
  setHide: (value: boolean) => void;
}

const Profile = (props: ProfileProps) => {
  //TODO: will be move to signin page later
  const { accessToken, logIn, logOut } = useAuthManagementStore();

  const [localUserProfile, setLocalUserProfile] =
    useState<UserManagement | null>();
  const { getUserProfile, userProfile } = useUserManagementStore();

  useEffect(() => {
    //TODO: apply check token here
    // const sessionData = sessionStorage.getItem("userManagement-storage");

    //TODO: will be move to signin page later
    const handleLogin = async () => {
      await logIn("pk2@gmail.com", "1111");
    };

    handleLogin();

    const fetchUserProfile = async () => {
      await getUserProfile();
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    setLocalUserProfile(userProfile);
  }, [userProfile]);

  const onLogout = () => {
    console.log("🌟⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️🌟 >>>>>> logout");
  };

  const onEdit = () => {
    console.log("🌟⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️🌟 >>>>>> 2222");
    props.setHide(true);
  };

  return !props.hide ? (
    <section className="relative">
      {/* Background */}
      <div className="w-full h-[40vh] relative bg-dark-green">
        <Image
          src="/images/skillane-logo.png"
          alt="skillane logo"
          width={80}
          height={80}
          className="object-cover rounded-full absolute top-5 left-5 sm:top-10 sm:left-10"
        />
        <IconAction
          icon="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          strokeWidth={2}
          className="size-6 absolute top-5 right-5 sm:top-10 sm:right-10 text-white hover:text-red-600 cursor-pointer"
          action={onLogout}
        />
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-[90%] sm:w-[80%] md:min-h-[60vh] h-auto absolute top-[60%] left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-center p-6 sm:pb-10 sm:mb-[100px]">
        {/* Edit Icon */}
        <div className="absolute top-5 right-5 sm:top-10 sm:right-10 flex text-dark-green font-bold font-serif hover:text-emerald-900 cursor-pointer">
          <IconAction
            icon="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            strokeWidth={1.5}
            className="size-6"
            action={onEdit}
            iconText="Edit"
            iconTextClass="ml-1 hidden sm:block"
          />
        </div>

        {/* Profile Image */}
        <Image
          src={
            userProfile?.profileImg
              ? userProfile?.profileImg
              : "/images/blank-profile.png"
          }
          alt="Skillane Logo"
          width={250}
          height={250}
          className="w-32 h-32 md:w-64 md:h-64 object-cover rounded-full shadow-2xl -mt-20 sm:-mt-32"
        />

        {/* Profile Name & Email */}
        <div className="mt-5">
          <p className="text-[28px] sm:text-[35px] text-dark-green font-bold">
            {userProfile?.firstName
              ? `${userProfile?.firstName} ${userProfile?.lastName}`
              : "-"}
          </p>
          <p className="text-gray-600 break-words text-sm sm:text-base">
            {userProfile?.email ? userProfile.email : "-"}
          </p>
        </div>

        {/* Profile Info */}
        <div className="mt-10 w-full px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-white">
            <div className="bg-[rgba(38,138,100,0.75)] shadow-lg backdrop-blur-2xl border rounded-xl p-4 sm:p-6 text-center">
              <p className="text-xl font-semibold">ID No.</p>
              <p className="text-sm sm:text-base">
                {userProfile?.identificationNo
                  ? userProfile?.identificationNo.slice(4, -1)
                  : "-"}
              </p>
            </div>
            <div className="bg-[rgba(38,138,100,0.75)] shadow-lg backdrop-blur-2xl border rounded-xl p-4 sm:p-6 text-center">
              <p className="text-xl font-semibold">Tel</p>
              <p className="text-sm sm:text-base">
                {userProfile?.phoneNo ? userProfile.phoneNo : "-"}
              </p>
            </div>
            <div className="bg-[rgba(38,138,100,0.75)] shadow-lg backdrop-blur-2xl border rounded-xl p-4 sm:p-6 text-center">
              <p className="text-xl font-semibold">Age</p>
              <p className="text-sm sm:text-base">
                {userProfile?.dob
                  ? getAge(
                      new Date(userProfile.dob).toISOString().split("T")[0]
                    )
                  : "-"}
              </p>
            </div>
            <div className="bg-[rgba(38,138,100,0.75)] shadow-lg backdrop-blur-2xl border rounded-xl p-4 sm:p-6 text-center">
              <p className="text-xl font-semibold">Date of Birth</p>
              <p className="text-sm sm:text-base">
                {userProfile?.dob
                  ? new Date(userProfile.dob).toISOString().split("T")[0]
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default Profile;
