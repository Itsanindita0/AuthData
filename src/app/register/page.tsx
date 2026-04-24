"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validation";
import { z } from "zod";
import { registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  type FormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    trigger, // 🔥 important
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  // 🔥 STEP 1 VALIDATION
  const handleNext = async () => {
    const valid = await trigger(["name", "email", "password"]);

    if (valid) {
      setStep(2);
    } else {
      toast.error("Please fix errors before continuing");
    }
  };

  // 🔥 SUBMIT
  const onSubmit = async (data: FormData) => {
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
        err?.response?.data?.error ||
        err?.message ||
        "Registration failed";

      toast.error(message);
    }

    setLoading(false);
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#f5f1eb] px-4">
    
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10 border border-[#e5dccf]">

      {/* Title */}
      <h2 className="text-3xl font-semibold text-center text-[#5c4b3a]">
        Create Account
      </h2>
      <p className="text-center text-[#9c8b7a] text-sm mb-6">
        Let’s get you started
      </p>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-[#e5dccf] rounded-full mb-6 overflow-hidden">
        <div
          className={`h-full bg-[#5c4b3a] transition-all duration-300 ${
            step === 1 ? "w-1/2" : "w-full"
          }`}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="space-y-4">

              <div>
                <label className="label">Full Name</label>
                <input {...register("name")} className="input" />
                {errors.name && <p className="error">{errors.name.message}</p>}
              </div>

              <div>
                <label className="label">Email</label>
                <input {...register("email")} className="input" />
                {errors.email && <p className="error">{errors.email.message}</p>}
              </div>

              <div>
                <label className="label">Password</label>
                <input {...register("password")} type="password" className="input" />
                {errors.password && <p className="error">{errors.password.message}</p>}
              </div>

            </div>

            <button
              type="button"
              onClick={handleNext}
              className="btn-primary"
            >
              Next →
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="text-center mb-2">
              <h3 className="text-lg font-semibold text-[#5c4b3a]">
                Organization Details
              </h3>
              <p className="text-sm text-[#9c8b7a]">
                Almost done ✨
              </p>
            </div>

            <div className="space-y-4">

              <div>
                <label className="label">Organization Name</label>
                <input {...register("orgDetails.name")} className="input" />
                {errors.orgDetails?.name && (
                  <p className="error">{errors.orgDetails.name.message}</p>
                )}
              </div>

              <div>
                <label className="label">Legal Name</label>
                <input {...register("orgDetails.legalName")} className="input" />
                {errors.orgDetails?.legalName && (
                  <p className="error">{errors.orgDetails.legalName.message}</p>
                )}
              </div>

              <div>
                <label className="label">Organization Email</label>
                <input {...register("orgDetails.contactInfo.email")} className="input" />
                {errors.orgDetails?.contactInfo?.email && (
                  <p className="error">
                    {errors.orgDetails.contactInfo.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Phone Number</label>
                <input {...register("orgDetails.contactInfo.phone")} className="input" />
                {errors.orgDetails?.contactInfo?.phone && (
                  <p className="error">
                    {errors.orgDetails.contactInfo.phone.message}
                  </p>
                )}
              </div>

            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary"
              >
                ← Back
              </button>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? "Submitting..." : "Register"}
              </button>
            </div>
          </>
        )}
      </form>

      {/* Footer */}
      <p className="text-sm text-center text-[#8c7a66] mt-6">
        Already have an account?{" "}
        <span
          onClick={() => router.push("/login")}
          className="text-[#5c4b3a] cursor-pointer hover:underline font-medium"
        >
          Login
        </span>
      </p>
    </div>
  </div>
);
}