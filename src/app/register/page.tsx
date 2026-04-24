"use client";

import { useForm } from "react-hook-form";
import { registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterBody } from "@/types/auth";
import toast from "react-hot-toast";

export default function Register() {
  const { register, handleSubmit, getValues } = useForm<RegisterBody>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); //  step control

  const onSubmit = async (data: RegisterBody) => {
    setLoading(true);

    try {
      const res = await registerUser(data);

      if (res) {
        toast.success("Registered successfully ✅");

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "";

      if (message.toLowerCase().includes("already")) {
        toast.error("Email already registered");
      } else {
        toast.error("Registration failed");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-amber-200">
        
        <h2 className="text-3xl font-semibold text-center text-amber-800">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* USER DETAILS */}
          {step === 1 && (
            <>
              <input
                {...register("name")}
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-amber-300 rounded-lg text-black"
              />

              <input
                {...register("email")}
                placeholder="Email"
                className="w-full px-4 py-3 border border-amber-300 rounded-lg text-black"
              />

              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-amber-300 rounded-lg text-black"
              />

              {/* Next Button */}
              <button
                type="button"
                onClick={() => {
                  const { name, email, password } = getValues();

                  // simple validation
                  if (!name || !email || !password) {
                    toast.error("Please fill all fields");
                    return;
                  }

                  setStep(2);
                }}
                className="w-full py-3 bg-amber-700 text-white rounded-lg"
              >
                Next
              </button>
            </>
          )}

          {/*  ORG DETAILS */}
          {step === 2 && (
            <>
              <div className="text-sm text-amber-700 text-center font-medium">
                Organization Details
              </div>

              <input
                {...register("orgDetails.name")}
                placeholder="Organization Name"
                className="w-full px-4 py-3 border border-stone-300 rounded-lg text-black"
              />

              <input
                {...register("orgDetails.legalName")}
                placeholder="Legal Name"
                className="w-full px-4 py-3 border border-stone-300 rounded-lg text-black"
              />

              <input
                {...register("orgDetails.contactInfo.email")}
                placeholder="Organization Email"
                className="w-full px-4 py-3 border border-stone-300 rounded-lg text-black"
              />

              <input
                {...register("orgDetails.contactInfo.phone")}
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-stone-300 rounded-lg text-black"
              />

              {/* Buttons */}
              <div className="flex gap-3">
                
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/2 py-3 bg-green-950 rounded-lg"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 py-3 bg-amber-700 text-white rounded-lg"
                >
                  {loading ? "Submitting..." : "Register"}
                </button>

              </div>
            </>
          )}
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-stone-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-amber-700 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}