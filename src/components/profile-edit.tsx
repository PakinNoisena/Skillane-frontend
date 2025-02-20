import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import IconAction from "./icon-action";
import ButtonProps from "./button";
import Image from "next/image";
import { UserManagement } from "@/services/models/user.model";
import { useUserManagementStore } from "@/stores/user.store";

interface EditProfileProps {
  onClose: (value: boolean) => void;
  userProfileInfo: UserManagement;
}

const ProfileEdit = ({ onClose, userProfileInfo }: EditProfileProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<UserManagement>({
    id: "",
    email: "",
    identificationNo: "",
    dob: new Date(),
    phoneNo: "",
    profileImg: "",
    firstName: "",
    lastName: "",
    isFirstEdit: false,
  });

  const { getUserProfile, updateUserProfile, uploadProfileImage } =
    useUserManagementStore();
  useEffect(() => {
    if (userProfileInfo) {
      setFormData({
        ...userProfileInfo,
        firstName: userProfileInfo.firstName ?? "",
        lastName: userProfileInfo.lastName ?? "",
        email: userProfileInfo.email ?? "",
        identificationNo: userProfileInfo.identificationNo ?? "",
        phoneNo: userProfileInfo.phoneNo ?? "",
        profileImg: userProfileInfo.profileImg ?? "",
        dob: userProfileInfo.dob ? userProfileInfo.dob : new Date(), // Ensure date input is always formatted
      });
    }
  }, [userProfileInfo]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(false), 500);
    getUserProfile();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.profileImg) {
      delete formData.profileImg;
    }
    updateUserProfile(formData);
    setTimeout(() => onClose(false), 200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "dob" ? new Date(value) : value, // ✅ Convert back to Date when storing
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      await uploadProfileImage(file);

      setFormData((prev) => ({
        ...prev,
        profileImg: useUserManagementStore.getState().uploadImage,
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.section
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      animate={isVisible ? { x: 0 } : { x: "-100%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-full z-40 absolute top-0 shadow-lg p-3 bg-dark-green flex items-center justify-center overflow-hidden"
    >
      <div className="bg-white w-[95%] h-auto md:h-[80%] flex flex-col md:flex-row justify-center items-center rounded-2xl overflow-hidden max-h-full p-6 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
        <div className="absolute right-[10%] top-[5%] md:top-12 md:right-24">
          <IconAction
            icon="M6 18 18 6M6 6l12 12"
            strokeWidth={4}
            className="size-6"
            action={handleClose}
            iconColor="green"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-2 px-6 md:px-20 w-full h-full overflow-hidden md:mt-20">
          <div className="flex flex-col items-center gap-4">
            <Image
              src={formData.profileImg || "/images/blank-profile.png"}
              alt="Profile Image"
              width={250}
              height={250}
              className="w-32 h-32 md:w-64 md:h-64 object-cover rounded-full shadow-2xl"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="fileInput"
            />
            <label htmlFor="fileInput">
              <ButtonProps
                text={uploading ? "Uploading..." : "Upload Image"}
                className="bg-dark-green text-white mt-5"
                action={() => document.getElementById("fileInput")?.click()}
              />
            </label>
          </div>
          <div className="overflow-y-auto max-h-[80vh] p-2 w-full h-full">
            <form className="p-4 space-y-4" onSubmit={handleSave}>
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-200 text-gray-600 border-gray-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Identification Number
                </label>
                <input
                  type="text"
                  name="identificationNo"
                  value={formData.identificationNo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={
                    formData.dob
                      ? new Date(formData.dob).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <ButtonProps
                  text="Save"
                  className="bg-dark-green text-white p-2 rounded-md w-full"
                  type="submit"
                  action={() => handleSave}
                />
                <ButtonProps
                  text="Close"
                  className="bg-white text-dark-green p-2 rounded-md w-full mt-2 border-dark-green border-[2px]"
                  type="button"
                  action={handleClose}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProfileEdit;
