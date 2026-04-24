"use client";

import { useEffect, useState } from "react";
import { getUserDetails } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function DashboardClient({ token }: { token: string }) {
  const [user, setUser] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserDetails(token);
        setUser(res);
      } catch {
        router.push("/login");
      }
    };

    fetchUser();
  }, [token]);

  return (
  <div className="min-h-screen flex items-center justify-center bg-amber-100 px-4">
    
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
      
      {/* Title */}
      <h1 className="text-2xl font-semibold text-amber-800 mb-4">
        Dashboard
      </h1>

      {/* Content */}
      {!user ? (
        <p className="text-stone-500">Loading...</p>
      ) : (
        <div className="space-y-4">
          
          {/* Avatar */}
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-700 flex items-center justify-center text-white text-2xl font-semibold shadow">
            {user.data.name.charAt(0)}
          </div>

          {/* Welcome */}
          <h2 className="text-lg font-medium text-stone-700">
            Welcome, {user.data.name}
          </h2>

          {/* Info Card */}
          <div className="bg-amber-50 rounded-lg p-4 text-sm text-stone-700 border border-amber-200">
            <p>
              <span className="font-medium text-amber-800">Role:</span>{" "}
              {user.data.role}
            </p>
          </div>

        </div>
      )}
    </div>

    {/* Logout Button */}
    <button
      onClick={() => {
        document.cookie = "token=; path=/; max-age=0";
        router.push("/login");
      }}
      className="fixed bottom-6 right-6 px-5 py-3 bg-amber-700 text-white rounded-full shadow-md hover:bg-amber-800 transition duration-200"
    >
      Logout
    </button>

  </div>
);
  
}