import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { updateProfile } from "../api/fetch";
import localstorageService from "../services/localstorage-service";

const ModalComponent = ({ profile, modal, onToggle }) => {
  const initalProfile = {
    email: profile.email,
    username: profile.username,
  };

  const token = localstorageService.getToken("token");

  const onChangeHandler = (e) => {
    const { id, value } = e.target;
    initalProfile[id] = value;
  };

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    if (!initalProfile.password) {
      toast.error("Password must be 8 characters.");
      return;
    }
    if (!initalProfile.username) {
      toast.error("Username can't be empty");
      return;
    }
    if (!initalProfile.email) {
      toast.error("Email can't be empty");
      return;
    }
    try {
      const res = await updateProfile(token, initalProfile, profile.username);
      if (res) {
        toast.success("Profile updated successfully.");
        onToggle();
        <Navigate to="/" />;
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <React.Fragment>
      <Button
        onClick={onToggle}
        className="bg-[#004A83] rounded-md px-4 py-2 text-sm text-white hover:opacity-90"
      >
        Edit Profile
      </Button>
      <Modal show={modal} onClose={onToggle}>
        <Modal.Header>Edit your profile</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4">
            <CustomInput
              id="password"
              onChange={onChangeHandler}
              placeholder={"Enter your current password"}
              type="password"
              isRequired={true}
              value={null}
            />
            <div className="flex w-full space-x-3">
              <CustomInput
                id="email"
                onChange={onChangeHandler}
                placeholder={profile.email}
                value={profile.email}
                type="text"
                isRequired={true}
              />
              <CustomInput
                id="username"
                onChange={onChangeHandler}
                placeholder="Enter your username."
                value={profile.username}
                type="text"
                isRequired={true}
              />
            </div>
            <div className="flex w-full space-x-3">
              <CustomInput
                id="first_name"
                onChange={onChangeHandler}
                placeholder="Enter your first name."
                value={profile.first_name}
                type="text"
              />
              <CustomInput
                id="last_name"
                onChange={onChangeHandler}
                placeholder="Enter your last name."
                value={profile.last_name}
                type="text"
              />
            </div>

            <CustomInput
              id="location"
              onChange={onChangeHandler}
              placeholder="Enter your location."
              value={profile.location}
              type="text"
            />
            <CustomInput
              id="bio"
              onChange={onChangeHandler}
              placeholder="Write something about yourself."
              value={profile.bio}
              type="text"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            onClick={onSubmitUpdate}
            className="bg-[#004A83]"
          >
            Update now
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ModalComponent;

export const CustomInput = ({
  value,
  onChange,
  placeholder,
  id,
  type,
  isRequired = false,
  ...props
}) => {
  return (
    <div className={`w-full ${props.className}`}>
      <div className="mb-2 flex space-x-1">
        <Label htmlFor={id} value={id} />
        {isRequired && <p className="text-red-600">*</p>}
      </div>
      <TextInput
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={value === null ? null : value}
      />
    </div>
  );
};
