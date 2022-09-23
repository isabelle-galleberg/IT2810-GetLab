import "./TextField.css"
import React from "react"

export default function FormInput({ onChange, placeholder }: TextFieldProps) {
  return (
    <div className="wrapperInput">
      <input className="inputField" onChange={onChange} placeholder={placeholder} ></input>
    </div>
  );
}




























// import { TextField } from "@material-ui/core";

// type CustomTextFieldProps = {
//   label: string,
//   name: string,
//   changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
// }

// const CustomTextField = (props: CustomTextFieldProps) => {
//   return (
//     <TextField
//       label={props.label}
//       name={props.name}
//       onChange={props.changeHandler}

//       variant={"outlined"} //enables special material-ui styling
//       size={"small"}
//       margin={"dense"}
//     />
//   );
// }
