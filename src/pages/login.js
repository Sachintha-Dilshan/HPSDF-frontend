"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth-service";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Alerts from "../components/alert";

function Login() {
  let navigate = useNavigate();
  // const form = React.useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setUsernameError("");
    setPasswordError("");

    //form.current.validateAll();
    if (!username) setUsernameError("Username is empty");
    else if (!password) setPasswordError("Password is empty");
    else {
      AuthService.login(username, password).then(
        () => {
          navigate("/dashboard")
          // window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
        }
      );
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage:
          process.env.PUBLIC_URL + "url('/Images/background.jpeg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        className="flex flex-col gap-4 md:w-1/4 bg-slate-300 w-full mx-10 px-10 py-28 rounded-3xl opacity-85"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col items-center justify-center gap-5">
          <h2 className="text-2xl text-slate-700 uppercase text-center font-bold">
            Hakmana Pradeshiya Sabha
          </h2>
          <div className="flex text-center justify-center">
            <img
              src={process.env.PUBLIC_URL + "/Images/government-logo.png"}
              className="mr-2 h-14 "
              alt="Government Logo"
            />
            <img
              src={process.env.PUBLIC_URL + "/Images/sabha-logo.png"}
              className="h-14"
              alt="Sabha Logo"
            />
          </div>
          <h2 className="text-3xl text-slate-600 text-center">Sign In</h2>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your username" />
          </div>
          <TextInput
            id="email1"
            type="text"
            placeholder="username"
            onChange={onChangeUsername}
          />
          {usernameError && <Alerts alert={usernameError} />}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            placeholder="password"
            onChange={onChangePassword}
          />
          {passwordError && <Alerts alert={passwordError} />}
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        {/* <Link to="/HR/dashboard"> */}
        <Button type="submit" className="uppercase w-full font-bold">
          Submit
        </Button>
        {/* </Link> */}
        {message && <Alerts alert={message} />}
      </form>
    </div>
  );
}

export default Login;
