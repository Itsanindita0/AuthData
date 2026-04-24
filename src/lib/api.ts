import { LoginBody, RegisterBody,ApiResponse } from "@/types/auth";


export const registerUser = async (data: any) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  
  if (!res.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};

export const loginUser = async (data: LoginBody) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
    data
    ),
  });

  return res.json();
};

export const getUserDetails = async (token: string) => {
    console.log("hi"+token);
    
  const res = await fetch("/api/users/details", {
    method: "GET",
    headers: {
    
        Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};