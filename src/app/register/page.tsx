"use client";

import { useForm } from "react-hook-form";
import { registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterBody } from "@/types/auth";

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterBody>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegisterBody) => {
    setLoading(true);
    try {
      console.log(data);
      const res = await registerUser(data);
      if (res) router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 px-4">
      
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 space-y-6 border border-pink-100">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-pink-600">
          Create Account 💖
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* User Info */}
          <input
            {...register("name")}
            placeholder="👩 Full Name"
            className="w-full px-4 py-3 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 bg-pink-50 placeholder:text-pink-300"
          />

          <input
            {...register("email")}
            placeholder="💌 Email"
            className="w-full px-4 py-3 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 bg-pink-50 placeholder:text-pink-300"
          />

          <input
            {...register("password")}
            type="password"
            placeholder="🔒 Password"
            className="w-full px-4 py-3 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 bg-pink-50 placeholder:text-pink-300"
          />

          {/* Divider */}
          <div className="text-sm text-pink-500 pt-2 text-center font-medium">
            ✨ Organization Details ✨
          </div>

          {/* Org Info */}
          <input
            {...register("orgDetails.name")}
            placeholder="🏢 Organization Name"
            className="w-full px-4 py-3 border border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 bg-purple-50 placeholder:text-purple-300"
          />

          <input
            {...register("orgDetails.legalName")}
            placeholder="📄 Legal Name"
            className="w-full px-4 py-3 border border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 bg-purple-50 placeholder:text-purple-300"
          />

          <input
            {...register("orgDetails.contactInfo.email")}
            placeholder="📧 Org Email"
            className="w-full px-4 py-3 border border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 bg-purple-50 placeholder:text-purple-300"
          />

          <input
            {...register("orgDetails.contactInfo.phone")}
            placeholder="📱 Phone Number"
            className="w-full px-4 py-3 border border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 bg-purple-50 placeholder:text-purple-300"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "💖 Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            className="text-pink-600 cursor-pointer hover:underline font-medium"
            onClick={() => router.push("/login")}
          >
            Login ✨
          </span>
        </p>

        {/* Cute Footer */}
        <p className="text-xs text-center text-gray-400">
          Made with 💗
        </p>

      </div>
    </div>
  );
}