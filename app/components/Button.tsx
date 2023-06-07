"use client";

import React, { FC, useMemo } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "disabled";
}

const Button: FC<Props> = ({ children, onClick, variant, ...rest }) => {
  const buttonClass = useMemo(() => {
    switch (variant) {
      case "primary":
        return `button button-motion button-primary ${
          onClick && "cursor-pointer"
        }`;
      case "secondary":
        return `button button-secondary ${onClick && "cursor-pointer"}`;
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
      className={`${rest.className} ${buttonClass}`}
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
