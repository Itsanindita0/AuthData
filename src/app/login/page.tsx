"use client";

import { useForm } from "react-hook-form";
import { loginUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { LoginBody } from "@/types/auth";

export default function Login() {
  const { register, handleSubmit } = useForm<LoginBody>();
  const router = useRouter();

  const onSubmit = async (data: LoginBody) => {
    const res = await loginUser(data);

    if (res.accessToken) {
      localStorage.setItem("token", res.accessToken);
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 px-4">
      
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-pink-100">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-2">
          Welcome Back 💖
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Login to continue ✨
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Email */}
          <input
            {...register("email")}
            placeholder="💌 Email"
            className="w-full px-4 py-3 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition text-gray-700 bg-pink-50 placeholder:text-pink-300"
          />

          {/* Password */}
          <input
            {...register("password")}
            type="password"
            placeholder="🔒 Password"
            className="w-full px-4 py-3 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition text-gray-700 bg-pink-50 placeholder:text-pink-300"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium shadow-md hover:scale-105 hover:shadow-lg transition duration-300"
          >
            💕 Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-pink-600 cursor-pointer hover:underline font-medium"
          >
            Register ✨
          </span>
        </p>

        {/* Cute Footer Line */}
        <p className="text-xs text-center text-gray-400 mt-4">
          Made with 💗
        </p>

      </div>
    </div>
  );
}