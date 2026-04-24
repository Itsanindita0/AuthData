"use client";

import { useForm } from "react-hook-form";
import { loginUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";

export default function Login() {
  const router = useRouter();

  type FormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginUser(data);

      if (res?.accessToken) {
        document.cookie = `token=${res.accessToken}; path=/`;

        toast.success("Login successful ✅");

        setTimeout(() => {
          router.replace("/dashboard");
        }, 1500);
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Login failed";

      toast.error(message);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#f5f1eb] px-4">
    
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-[#e5dccf]">

      {/* Title */}
      <h2 className="text-3xl font-semibold text-center text-[#5c4b3a]">
        Welcome Back
      </h2>

      <p className="text-center text-[#9c8b7a] text-sm mt-1 mb-6">
        Login to continue
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Email */}
        <div>
          <label className="block text-sm text-[#7a6a58] mb-1">
            Email
          </label>
          <input
            {...register("email")}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl border border-[#e5dccf] bg-[#faf7f3] text-[#5c4b3a] focus:outline-none focus:ring-2 focus:ring-[#cbbba0] transition"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-[#7a6a58] mb-1">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-xl border border-[#e5dccf] bg-[#faf7f3] text-[#5c4b3a] focus:outline-none focus:ring-2 focus:ring-[#cbbba0] transition"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}
        <button className="w-full py-3 bg-[#5c4b3a] text-white rounded-xl font-medium hover:bg-[#4a3d30] transition duration-200 shadow-sm">
          Login
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm text-center text-[#8c7a66] mt-6">
        Don’t have an account?{" "}
        <span
          onClick={() => router.push("/register")}
          className="text-[#5c4b3a] cursor-pointer hover:underline font-medium"
        >
          Register
        </span>
      </p>
    </div>
  </div>
);
}