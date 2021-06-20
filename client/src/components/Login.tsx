import React from 'react';
import { useHistory } from 'react-router-dom';

import Alert from './ui-components/Alert';
import Input from './form-components/Input';

type IProps = {
  handleJwtChange: (jwt: string) => void;
} & typeof defaultProps;

const defaultProps = {

};

function Login(props: IProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<string[]>([]);
  const [alert, setAlert] = React.useState({
    type: "d-none",
    msg: "",
  });

  const history = useHistory();

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  }, []);

  const handleSubmit = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: string[] = [];
    if (email === "") {
      errors.push("email");
    }
    if (password === "") {
      errors.push("password");
    }

    if (errors.length > 0) {
      setErrors(errors);
      return false;
    } else {
      setErrors([]);
    }

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      }),
    };

    try {
      let response = await fetch("http://localhost:4000/v1/signin", requestOptions);

      if (!response.ok) {
        response = await response.json();
        throw new Error((response as any).error?.message || "Something went wrong");
      }

      const data = await response.json() as { response: string };

      setAlert({ type: "alert-success", msg: "Logged in successfully!" });

      localStorage.setItem("go-movies-jwt", JSON.stringify(data.response));
      props.handleJwtChange(data.response);

      history.push({
        pathname: "/",
      });
    } catch (err) {
      setAlert({ type: "alert-danger", msg: err.message })
    }

  }, [email, password, props, history]);

  const hasError = (key: string) => {
    return errors.indexOf(key) !== -1;
  }

  return (
    <React.Fragment>
      <h2>Login</h2>

      <hr />

      <Alert alertType={alert.type} alertMsg={alert.msg} />

      <form className="pt-3" onSubmit={handleSubmit}>
        <Input
          value={email}
          title="Email"
          type="email"
          name="email"
          handleChange={handleChange}
          className={hasError("email") ? "is-invalid" : ""}
          errorDiv={hasError("email") ? "text-danger" : "d-none"}
          errorMsg={"Please enter a valid email address"}
        />

        <Input
          value={password}
          title="Password"
          type="password"
          name="password"
          handleChange={handleChange}
          className={hasError("password") ? "is-invalid" : ""}
          errorDiv={hasError("password") ? "text-danger" : "d-none"}
          errorMsg={"Please enter a password"}
        />

        <hr />

        <button className="btn btn-primary">Login</button>
      </form>
    </React.Fragment>
  )
}

Login.defaultProps = defaultProps;

export default Login;
