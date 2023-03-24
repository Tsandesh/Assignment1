import { React, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../api/fetch";
import ModalComponent, { CustomInput } from "../components/ModalComponent";
import localstorageService from "../services/localstorage-service";

const Login = ({ setLoading, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const res = await login({ email, password });
      if (res.access) {
        setLoading(true);
        toast.success("Logged In sucessfully");
        localstorageService.setToken("token", res.access);
        navigate("/", {
          replace: true,
        });
        window.location.reload();
        setLoading(false);
      } else {
        setLoading(false);

        toast.error("Invalid Details");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] mx-16">
      {/* image */}
      <div className="mb-12 md:mb-0 md:w-7/12 lg:w-6/12">
        <img src="3236267.jpg" className="w-full" alt="Phone image" />
      </div>

      {/* Login component */}
      <div className=" justify-center flex-1 items-center max-w-[35%]">
        {" "}
        <div className="flex flex-col">
          <h1 className="flex justify-center mt-3 text-4xl text-[#014A83] font-bold text-bold">
            User Login
          </h1>
          <div className="m-5 flex flex-col">
            <CustomInput
              value={email}
              type="text"
              name="email"
              className="m-2 px-3"
              placeholder="Enter Your Email Adress"
              onChange={(e) => setEmail(e.target.value)}
            />

            <CustomInput
              value={null}
              type="password"
              name="password"
              className="m-2 px-3"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className=" rounded-xl mt-3 ml-4 color-white font-bold text-lg text-white text-md py-2 bg-[#014A83]"
              onClick={loginHandler}
            >
              Login
            </button>
          </div>

          {/* <button onClick={fetchProfile}>dasd</button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
