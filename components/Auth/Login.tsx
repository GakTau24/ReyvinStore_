"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginRes = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
      if (loginRes && !loginRes.ok) {
        toast.success(loginRes.error || "");
      } else {
        router.push("/dashboard/admin");
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data?.error;
        toast.error(errorMsg);
      }
    }
  };

  if (session) {
    router.push("/dashboard/admin");
  }

  return (
    <>
    <ToastContainer autoClose={2000} />
    <div className="fixed top-16 right-5 max-md:h-10 max-md:right-0">{submitError && toast.error(submitError) }</div>
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-opacity-70 backdrop-filter backdrop-blur-xl backdrop-brightness-110 shadow-2xl rounded px-10 py-7 mb-4"
        onSubmit={handleSubmit}>
        <motion.div
          whileHover={{ scale: 1.2 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}>
          <h1 className="text-xl text-center font-bold py-3 cursor-pointer">
            Reyvin <span className="text-yellow-500">Store</span>
          </h1>
        </motion.div>
        <hr className="my-3 sm:mx-auto border-gray-500 lg:my-4 opacity-30" />
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="email">
            Email
          </label>
          <input
            className="shadow-xl bg-transparent ring-1 focus:ring-fuchsia-500 appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-xl"
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-6 relative">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="password">
            Password
          </label>
          <input
            className="shadow-xl ring-1 focus:ring-fuchsia-500 bg-transparent  appearance-none rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-xl"
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="******************"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <span
            onClick={handleShowPassword}
            className="absolute right-0 flex items-center px-3 rounded py-3 cursor-pointer top-[26px] bg-yellow-500 hover:bg-sky-700">
            {showPassword ? (
              <BsEyeSlash color="black" />
            ) : (
              <BsEye color="black" />
            )}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.2 }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}>
            <button
              className="bg-yellow-500 hover:bg-sky-700 text-white shadow-xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-xl"
              type="submit"
              disabled={loading}>
              {loading ? (
                "Loading..."
              ) : (
                "Login"
              )}
            </button>
          </motion.div>
        </div>
        <p className="text-gray-700 pt-3">
        Dont have an account?{" "}
        <Link href={"/register"} className="text-sky-400">
        Sign Up
        </Link>
      </p>
      </form>
    </div>
  </>
  );
};

export default Login;
