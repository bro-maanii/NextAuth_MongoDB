"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  password: string;
}
function SingnupPage() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const [DisabledSignup, setDisabledSignup] = useState(true);
  const [processing,setProcessing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleSubmit = async () => {
    try {
        const response = await axios.post("http://localhost:3000/api/users/signup", user);
        setProcessing(true)
        console.log(response);
        router.push('/login');
        console.log("User created successfully");

    } catch (error) {
        console.log(error);

    }
  };
  useEffect(() => {
    if (
      user.name.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setDisabledSignup(false);
    } else {
      setDisabledSignup(true);
    }
  }, [user]);

  return (
    <section className="flex justify-center items-center h-svh w-full bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="flex flex-col w-full h-fit max-w-xl  p-8 bg-white shadow-lg rounded-lg">
        {
            (processing)? <h1 className="text-4xl text-center w-full">Processing...</h1>:<h1 className="text-4xl text-center w-full">Sign Up</h1>
        }
        <div
          className="flex flex-col justify-center mx-auto gap-6 w-full"
          
        >
          <label htmlFor="name" className="text-gray-700 font-semibold">
            Name:
            <input
              type="text"
              name="name"
              id="name"
              className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </label>

          <label htmlFor="email" className="text-gray-700 font-semibold">
            Email:
            <input
              type="email"
              name="email"
              id="email"
              className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </label>

          <label htmlFor="password" className="text-gray-700 font-semibold">
            Password:
            <input
              type="password"
              name="password"
              id="password"
              className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </label>          
            <button
              onClick={() => handleSubmit()}
              className={`mt-4 bg-blue-500 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out
                ${DisabledSignup ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={DisabledSignup}
            >
              {
                  (DisabledSignup)? 'Disabled': 'Sign Up'
              }
            </button>
          <span className="text-center font-mono font-extralight">OR</span>
          <Link
            href="/login"
            className="font-light hover:text-blue-900 text-center underline"
          >
            Login page
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SingnupPage;
