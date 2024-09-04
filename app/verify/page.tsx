"use client";
import React, { useEffect } from 'react';
import {useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function VerifyPage() {
  const router = useRouter(); 
  const searchParams = useSearchParams()
  if (searchParams.get('token') === null) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Verify Page</h1>
        <p className="text-gray-700">Invalid token</p>
      </div>
    );
  }
  const token = searchParams.get('token');
  useEffect(() => {
    axios.post('/api/users/verify', { token }).then((res) => {
      if (res.data.success) {
        router.push('/login');
      } else {
        router.push('/signup');
      }
    });
  }, [token]);
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Verify Page</h1>
      <p className="text-gray-700">Please wait while we verify your information.{token}</p>
    </div>
  );
}
