'use client'
import { useState, useEffect } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth ,database} from '@/app/firebase/config'; // Assuming you have initialized auth and database from Firebase config
import { useRouter } from 'next/navigation';
import {push ,ref ,set} from 'firebase/database'

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teamName, setTeamName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [teamNameError, setTeamNameError] = useState('');
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/inter');
    }
  }, [user, router]);

  const handleSignUp = async () => {
    if (!name) {
      setNameError('Name is required.');
      return;
    } else {
      setNameError('');
    }

    if (!teamName) {
      setTeamNameError('Team name is required.');
      return;
    } else {
      setTeamNameError('');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const res = await createUserWithEmailAndPassword(email, password);
      
      // Add user data to Realtime Database including team name
      const usersRef = ref(database, 'users');
      const newDataRef = push(usersRef);
    
      const userData = {
        name: name,
        email: email,
        teamName: teamName,
      };
    
      await set(newDataRef, userData);
    
      // Once the data is successfully stored in the database, perform other actions
      console.log('Data stored successfully in the database.');
      sessionStorage.setItem('user', true);
      setEmail('');
      setPassword('');
      setName('');
      setTeamName('');
    } catch (error) {
      console.error('Error storing data in the database:', error);
      alert('An error occurred while storing data in the database.');
    }
    
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <input
          type="text"
          placeholder="Team Leader Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {nameError && <p className="text-red-500 text-xs mb-4">{nameError}</p>}
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {teamNameError && <p className="text-red-500 text-xs mb-4">{teamNameError}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {emailError && <p className="text-red-500 text-xs mb-4">{emailError}</p>}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          >
            {showPassword ? (
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 9a6 6 0 00-6 6"
                />
              </svg>
            )}
          </span>
        </div>
        {passwordError && <p className="text-red-500 text-xs mb-4">{passwordError}</p>}
        <button
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
        
        <button onClick={() => router.push('/sign-in')}>
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
