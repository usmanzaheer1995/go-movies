import React from 'react';

type IProps = {
  name: string;
  title: string;
  type: string;
  value: any;
  placeholder?: string;
  className?: string;
  errorDiv: string;
  errorMsg: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>)=> void;
} & typeof defaultProps;

const defaultProps = {
  placeholder: "",
  className: "",
};

function Input(props: IProps) {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">{props.title}</label>
      <input

        type={props.type}
        className={`form-control ${props.className}`}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder || ""}
      />
      <div className={props.errorDiv}>
        {props.errorMsg}
      </div>
    </div>
  );
}

Input.defaultProps = defaultProps;

export default Input;
