'use client';

import { useState, useEffect } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignIn() {

  const [allProviders, setAllProviders] = useState(null);
  const { data: currentSession } = useSession();
  const router = useRouter();


  useEffect(() => {
    if (currentSession) {
      router.push('/');
    }
  }, [currentSession]);


  useEffect(() => {
    async function loadProviders() {
      const response = await getProviders();
      setAllProviders(response);
    }

    loadProviders();
  }, []);

  if (!allProviders) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: "url('/traditional-mexican-food-world-tourism-day_23-2149114021.jpg')" }}>
      
      <div className="w-[700px] h-[400px] flex bg-white bg-opacity-90 shadow-lg rounded-2xl overflow-hidden">

        {/* Left side */}
        <div className="w-1/2 bg-[#f5ebe7] p-6 flex flex-col justify-center items-center text-center">
  <h2 className="text-3xl font-bold text-black mb-2">Welcome to</h2>
  <h1 className="text-4xl font-extrabold text-black">Restaurant Finder</h1>
</div>


        {/* Right side */} 
        <div className="w-1/2 p-6 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-center mb-4">Sign In</h3>

          {Object.keys(allProviders).map((key) => {
            const provider = allProviders[key];
            return (
                <button
                key={provider.id}
                onClick={() => signIn(provider.id)}
                className="bg-[#f5ebe7] hover:bg-white text-black py-2 px- rounded  mb-4 w-[210px] flex items-center mx-10 rounded-xl"
              >
                <img
                  src='/image8-2.webp' 
                  alt='google'
                  className="mr-2 w-10 h-6 rounded-full mx-2"
                />
                Sign in with {provider.name}
              </button>
              
            );
          })}
        </div>

      </div>
    </div>
  );
}
