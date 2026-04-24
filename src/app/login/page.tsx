"use client";

import { useForm } from "react-hook-form";
import { loginUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { LoginBody } from "@/types/auth";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Login() {
  const { register, handleSubmit } = useForm<LoginBody>();
  const router = useRouter();

  
  const onSubmit = async (data: LoginBody) => {
    try {
      const res = await loginUser(data);

      if (res?.accessToken) {
        document.cookie = `token=${res.accessToken}; path=/`;

        toast.success("Login successful ✅");

        setTimeout(() => {
          router.replace("/dashboard");
        }, 2000);
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error: any) {
      
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
        
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center text-amber-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-stone-600 text-sm mb-6">
          Login to continue
        </p>
        

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-800 bg-white"
          />

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-800 bg-white"
          />

          <button
            type="submit"
            className="w-full py-3 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-stone-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-amber-700 cursor-pointer hover:underline font-medium"
          >
            Register
          </span>
        </p>
      </div>

    </div>
  );
}