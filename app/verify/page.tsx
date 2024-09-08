"use client";
import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

function VerifyComponent() {
  const router = useRouter(); 
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      axios.post('/api/users/verify', { token }).then((res) => {
        if (res.data.success) {
          router.push('/login');
        } else {
          router.push('/signup');
        }
      });
    }
  }, [token, router]);

  if (!token) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Verify Page</h1>
        <p className="text-gray-700">Invalid token</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Verify Page</h1>
      <p className="text-gray-700">Please wait while we verify your information.{token}</p>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className='text-4xl text-center'>Loading...</div>}>
      <VerifyComponent />
    </Suspense>
  );
}
