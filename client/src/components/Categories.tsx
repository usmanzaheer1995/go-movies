import React from 'react';

interface IProps {
  title: string;
}

export default function Categories(props: IProps) {
  return (
    <h2>
      Category: {props.title}
    </h2>
  )
}
