import { TextFieldProps } from "../../types/propTypes";
import "./TextField.css"

export default function TextField({ onChange, placeholder }: TextFieldProps) {
  return (
    <div className="wrapperInput">
      <input className="textField" onChange={onChange} placeholder={placeholder} ></input>
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
