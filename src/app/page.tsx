"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-stone-200 to-amber-200 px-4">
      
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-10 text-center max-w-md w-full border border-amber-200">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-amber-800 mb-2">
          Welcome
        </h1>
        <p className="text-stone-600 mb-6 text-sm">
          Let’s get you started
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          
          <button
            onClick={() => router.push("/login")}
            className="w-full py-3 bg-amber-950 text-white rounded-full font-medium shadow-md hover:scale-105 hover:shadow-lg transition duration-300"
          >
            Login Here
          </button>

          <button
            onClick={() => router.push("/register")}
            className="w-full py-3 bg-amber-100 text-amber-800 rounded-full font-medium hover:bg-amber-200 transition duration-300"
          >
            Register Here
          </button>

        </div>

        {/* Footer */}
        

      </div>
      
    </div>
  );
};

export default Page;