"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
interface IUser {
  email: string;
  password: string;
}
function LoginPage() {
  const router = useRouter()
  const [user , setUser] = useState<IUser>({
    email: '',
    password: ''
  })
  const [disabledSignin, setDisabledSignin] = useState(true)
  const [validUser, setValidUser] = useState(true)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value})
  }
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', user)
      console.log(response.data.success === true ? 'User logged in successfully' : 'Failed to login');
      if(response.data.success === false){
        console.log(response.data.message);
        setValidUser(false);
        return;
      }else{
        console.log('User logged in successfully');
        router.push('/')
        setValidUser(true);
      }
    } catch (error) {
      console.log(error);

    } 
  }
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setDisabledSignin(false);
    } else {
      setDisabledSignin(true);
    }
  }, [user]);
  return (
    <section className="flex justify-center items-center h-svh w-full bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="flex flex-col w-full h-fit max-w-xl  p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl text-center w-full pb-4">Sign In</h1>
        {
          !validUser && <p className="text-center bg-gray-200 p-4 font-mono text-red-600">Invalid Credentials or User is not verified</p>
        }
        <div
          className="flex flex-col justify-center mx-auto gap-6 w-full"
          
        >
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
                ${disabledSignin ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={disabledSignin}
            >
              {
                  (disabledSignin)? 'Disabled': 'Login'
              }
            </button>
          <span className="text-center font-mono font-extralight">OR</span>
          <Link
            href="/signup"
            className="font-light hover:text-blue-900 text-center underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LoginPage