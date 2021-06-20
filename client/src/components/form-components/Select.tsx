import React from 'react';

type IProps = {
  name: string;
  title: string;
  value: any;
  placeholder?: string;
  options: {
    value: string;
    text: string;
  }[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>)=> void;
} & typeof defaultProps;

const defaultProps = {
  placeholder: "",
};

function Select(props: IProps) {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">{props.title}</label>
      <select
        className="form-select"
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.handleChange}
      >
        {props.options.map((o) => (
          <option className="form-select" key={o.value} value={o.value}>{o.text}</option>
        ))}
      </select>
    </div>
  )
}

Select.defaultProps = defaultProps;

export default Select;
