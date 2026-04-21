"use client";

import { useEffect, useState } from "react";
import { getUserDetails } from "@/lib/api";
import { useRouter } from "next/navigation";
import { userDetailsData } from "@/types/auth";

export default function Dashboard() {
  const [user, setUser] = useState<userDetailsData>();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await getUserDetails(token);
        console.log("USER DATA:", res);
        setUser(res);
      } catch (error) {
        console.error("ERROR:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center transition hover:scale-[1.02]">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

        {/* Content */}
        {!user ? (
          <p className="text-gray-500 animate-pulse">Loading...</p>
        ) : (
          <div className="space-y-4">
            {/* Avatar */}
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-pink-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {user.data.name.charAt(0)}
            </div>

            {/* Welcome Text */}
            <h2 className="text-xl font-semibold text-gray-700">
              Welcome, {user.data.name} 💖
            </h2>

            {/* Info Card */}
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 shadow-inner">
              <p>
                <span className="font-medium">Role:</span> {user.data.role}
              </p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/login");
        }}
        className="fixed bottom-6 right-6 px-5 py-3 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition duration-300"
      >
        Logout 💕
      </button>
    </div>
  );
}
