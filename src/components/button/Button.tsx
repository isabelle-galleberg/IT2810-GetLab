import { ButtonProps } from "../../types/propTypes";
import "./Button.css"

export default function Button({ onClick, children, disabled }: ButtonProps) {
  return (
    <button className="button" onClick={onClick} disabled={disabled} >
      {children}
    </button >
  );
}