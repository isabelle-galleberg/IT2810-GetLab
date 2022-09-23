import React from "react";
import "./Button.css"

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
};

export default function Button({ onClick, children, disabled }: Props) {
  return (
    <button className="button" onClick={onClick} disabled={disabled} >
      {children}
    </button >
  );
}