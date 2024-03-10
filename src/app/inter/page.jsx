'use client'
import {useState} from 'react';
import { useRouter } from 'next/navigation';

function RegistrationSuccessPage() {
    const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-4">Registration Successful!</h2>
        <p className="text-lg text-gray-300 mb-4">Thank you for registering. Your account has been successfully created.</p>
        <div className="text-center">
          <button onClick={() => router.push('/sign-in')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            Click here to login
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationSuccessPage;
