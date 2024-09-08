"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/users/logout");
      if (res.data.success === true) {
        console.log(res);
        // router.push("/login");
        router.refresh();
      } else {
        console.log(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userInfo = async () => {
    try {
      const res = await axios.post("/api/users/userInfo");
      if (res.data.success === true) {
        console.log(res);
        setUser(res.data.user);
        setLoading(false);
      } else {
        console.log(res.data.msg);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userInfo();
  }, []);
  return (
    <div className="bg-gray-200 p-4 h-svh">
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
      {Object.keys(user).length !== 0 ? (
        loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Created At: {user.createdAt}</p>
            <p>Updated At: {user.updatedAt}</p>
            <button
              className="bg-blue-500 text-white px-6 text-xl py-6 rounded-md mt-4"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        )
      ) : (
        <p>No User Found</p>
      )}
    </div>
  );
}
