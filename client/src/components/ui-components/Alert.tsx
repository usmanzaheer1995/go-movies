import React from 'react';

export type AlertProps = {
  alertType: string;
  alertMsg: string;
} & typeof defaultProps;

const defaultProps = {

}

function Alert(props: AlertProps) {
  return (
    <div className={`alert ${props.alertType}`} role="alert">
      {props.alertMsg}
    </div>
  )
}

Alert.defaultProps = defaultProps;

export default Alert;