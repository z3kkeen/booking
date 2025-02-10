"use client";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user) {
      setIsLoading(false);
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="size-12 animate-spin text-primary">Loading...</h1>
      </div>
    );
  }
}
