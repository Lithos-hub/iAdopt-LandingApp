"use client";

import React, { FC, useMemo } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "disabled";
}

const Button: FC<Props> = ({ children, onClick, variant, ...rest }) => {
  const buttonClass = useMemo(() => {
    switch (variant) {
      case "primary":
        return `button button-motion button-primary ${
          onClick && "cursor-pointer"
        }`;
      case "secondary":
        return `button button-secondary`;
      case "success":
        return `button button-success`;
      case "disabled":
        return "button-disabled";
      default:
        return `button button-motion button-primary ${
          onClick && "cursor-pointer"
        }`;
    }
  }, [variant, onClick]);

  return (
    <button
      {...rest}
      className={`${rest.className ?? ""} ${buttonClass} ${
        onClick && "cursor-pointer"
      }`}
      onClick={onClick}
    >
      <div
        className={`${
          variant !== "disabled" && "button-inner"
        } uppercase tracking-widest`}
      >
        {children}
      </div>
    </button>
  );
};

export default Button;
