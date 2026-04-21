"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 px-4">
      
      
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 text-center max-w-md w-full border border-pink-100">
        
        {/* Cute Title */}
        <h1 className="text-3xl font-bold text-pink-600 mb-2">
          Welcome 💖
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          Let’s get you started ✨
        </p>
        

        {/* Buttons */}
        <div className="space-y-4">
          
          <button
            onClick={() => router.push("/login")}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium shadow-md hover:scale-105 hover:shadow-lg transition duration-300"
          >
            💕 Login Here
          </button>

          <button
            onClick={() => router.push("/register")}
            className="w-full py-3 bg-pink-100 text-pink-600 rounded-full font-medium hover:bg-pink-200 transition duration-300"
          >
            ✨ Register Here
          </button>

        </div>

        {/* Cute Footer */}
        <p className="text-xs text-gray-400 mt-6">
          Made with 💗
        </p>

      </div>
      
    </div>
  );
};

export default Page;