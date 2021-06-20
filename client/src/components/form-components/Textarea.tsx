import React from 'react';

type IProps = {
  name: string;
  title: string;
  value: any;
  placeholder?: string;
  rows?: number;
  className?: string;
  errorDiv: string;
  errorMsg: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>)=> void;
} & typeof defaultProps;

const defaultProps = {
  rows: 3,
  placeholder: "",
  className: "",
};

function Textarea(props: IProps) {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">{props.title}</label>
      <textarea
        className={`form-control ${props.className}`}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        rows={props.rows}
      />
      <div className={props.errorDiv}>
        {props.errorMsg}
      </div>
    </div>
  )
}

Textarea.defaultProps = defaultProps;

export default Textarea;
