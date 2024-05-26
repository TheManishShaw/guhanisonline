"use client";
import React, { useEffect, useState } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axiosInstance";

const WithAuth = (WrappedComponent) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { token } = parseCookies();

    if (!token) {
      router.push("/sign-in");
      return;
    }

    axiosInstance
      .get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        destroyCookie(null, "token");
        router.push("/sign-in");
      });
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <WrappedComponent user={user} {...props} />;
};

export default WithAuth;
