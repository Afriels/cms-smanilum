"use client";

import { useState } from "react";

export function useToast() {
  const [message, setMessage] = useState("");

  function showToast(value: string) {
    setMessage(value);
    window.setTimeout(() => setMessage(""), 2500);
  }

  return { message, showToast };
}
