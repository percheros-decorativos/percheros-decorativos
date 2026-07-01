"use client";
import { Toaster } from "react-hot-toast";

export default function ToasterWrapper() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "#2b2b2b",
          color: "#fff",
          fontSize: "0.9rem",
          borderRadius: "0.5rem",
        },
        success: { iconTheme: { primary: "#c8102e", secondary: "#fff" } },
      }}
    />
  );
}
