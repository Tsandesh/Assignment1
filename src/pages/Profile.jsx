import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { fetchProfile, logout } from "../api/fetch";
import ModalComponent from "../components/ModalComponent";
import localstorageService from "../services/localstorage-service";

export const Profile = () => {
  const [profile, setProfile] = useState({});
  const [modal, setModal] = useState(false);
  const onToggle = () => {
    setModal((prev) => !prev);
  };

  useEffect(() => {
    console.log("render");
    const token = localStorage.getItem("token");
    const getProfile = async () => {
      const res = await fetchProfile(token);
      setProfile(res);
    };
    getProfile();
  }, [modal]);

  const onLogout = async () => {
    window.location.reload();
    // await logout(localStorage.getItem("token"));
    localstorageService.deleteToken("token");
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-2">
      <div class="flex items-center h-screen w-full justify-center">
        <div class="w-1/3">
          <div class="flex flex-col items-center bg-white border-2 rounded-lg py-3">
            <h1 className=" mt-3 text-4xl text-[#014A83] font-bold text-bold">
              Profile
            </h1>
            <div class="photo-wrapper p-2">
              <img
                class="w-32 h-32 rounded-full mx-auto"
                src={profile.avatar}
                alt="John Doe"
              />
            </div>
            <div class="p-2">
              <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
                {profile.username}
              </h3>

              <table class="text-xs my-3 ml-10">
                <tbody>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold text-right ">
                      Username :
                    </td>
                    <td class="px-2 py-2">{profile.username}</td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold text-right ">
                      Email :{" "}
                    </td>
                    <td class="px-2 py-2">{profile.email}</td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold text-right ">
                      First Name :
                    </td>
                    <td class="px-2 py-2">{profile.first_name}</td>
                  </tr>{" "}
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold text-right ">
                      Last Name :
                    </td>
                    <td class="px-2 py-2">{profile.last_name}</td>
                  </tr>{" "}
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold text-right ">
                      Location :
                    </td>
                    <td class="px-2 py-2">{profile.location}</td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold text-right ">
                      Bio :
                    </td>
                    <td class="px-2 py-2">{profile.bio}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-x-2 mt-5">
            <div className="flex gap-2 justify-center">
              <ModalComponent
                profile={profile}
                onToggle={onToggle}
                modal={modal}
              />
              <Button
                className="bg-[#004A83] rounded-md px-4 py-2 text-sm text-white hover:opacity-90"
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
