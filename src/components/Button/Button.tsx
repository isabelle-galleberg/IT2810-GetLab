import React from "react";
import { ButtonProps } from "../../types/propTypes";
import "./Button.css";

class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <button
        className="button"
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
