"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post("/api/register", {
      name,
      email,
      password,
    });
    setName("")
    setEmail("")
    setPassword("")
  };

  if (session) {
    router.push("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="bg-opacity-25 bg-gray-900 backdrop-blur-md p-8 rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-md bg-transparent border-violet-600 ring-1 focus:ring-violet-600 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-md bg-transparent border-violet-600 ring-1 focus:ring-violet-600 focus:outline-none0"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-md bg-transparent border-violet-600 ring-1 focus:ring-violet-600 focus:outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
            Register
          </button>
          <p className="pt-4 text-right">
            Already have an account?
            <Link href="/login">
              {" "}
              <span className="text-blue-600 hover:text-blue-800">Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
