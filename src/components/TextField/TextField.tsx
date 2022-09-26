import { TextFieldProps } from "../../types/propTypes";
import "./TextField.css"

export default function TextField({ onChange, placeholder }: TextFieldProps) {
  return (
    <div className="wrapperInput">
      <input className="textField" onChange={onChange} placeholder={placeholder} ></input>
    </div>
  );
}