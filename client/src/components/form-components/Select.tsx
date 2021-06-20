import React from 'react';

type IProps = {
  name: string;
  title: string;
  value: any;
  placeholder?: string;
  className?: string;
  errorDiv: string;
  errorMsg: string;
  options: {
    value: string;
    text: string;
  }[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>)=> void;
} & typeof defaultProps;

const defaultProps = {
  placeholder: "",
  className: "",
};

function Select(props: IProps) {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">{props.title}</label>
      <select
        className={`form-select ${props.className}`}
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.handleChange}
      >
        <option className="form-select">Choose...</option>
        {props.options.map((o) => (
          <option className="form-select" key={o.value} value={o.value}>{o.text}</option>
        ))}
      </select>
      <div className={props.errorDiv}>
        {props.errorMsg}
      </div>
    </div>
  )
}

Select.defaultProps = defaultProps;

export default Select;
