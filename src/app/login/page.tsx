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
    <div className="min-h-screen flex items-center justify-center bg-amber-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-amber-200">

        <h2 className="text-3xl font-semibold text-center text-amber-800 mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-stone-600 text-sm mb-6">
          Login to continue
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <button className="w-full py-3 bg-amber-700 text-white rounded-lg">
            Login
          </button>
        </form>

        <p className="text-sm text-center text-stone-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-amber-700 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}