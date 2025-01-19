import React from "react";

export default function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-[80%] bg-[#3F3632] rounded-[0.625rem] text-[1.3rem] font-medium text-[#fff] py-3"
    >
      {children}
    </button>
  );
}
