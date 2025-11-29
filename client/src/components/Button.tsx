// client/src/components/Button.tsx
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: (e?: any) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function Button({
  children,
  onClick,
  disabled,
  type = "button",
  className = "",
  size = "md",
}: Props) {
  const sizeClass =
    size === "sm" ? "px-3 py-1.5 text-sm" : size === "lg" ? "px-5 py-3 text-base" : "px-4 py-2 text-base";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60 ${sizeClass} ${className}`}
    >
      {children}
    </button>
  );
}
