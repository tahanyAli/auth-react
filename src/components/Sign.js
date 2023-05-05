import React, { useState } from "react";
import axios from "axios";
import base64 from "base-64";
import { When } from "react-if";

function Sign() {
  const [loggedin, setLoggedin] = useState(false);
  const handleSignup = (e) => {
    e.preventDefault();
    const data = {
      userName: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

     axios
      .post("http://localhost:3002/signup", data)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.email.value,
      password: e.target.password.value,
    };
    const encodedCredintial = base64.encode(
      `${data.username}:${data.password}`
    );
    axios
      .post(
        "http://localhost:3002/login",
        {},
        {
          headers: {
            Authorization: `Basic ${encodedCredintial}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setLoggedin(true);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <When condition={!loggedin}>
        <div>
          <h2>Sign Up</h2>
          <form action="" onSubmit={handleSignup}>
            <input type="text" placeholder="username" name="username" />
            <input type="email" placeholder="email" name="email" />
            <input type="text" placeholder="password" name="password" />
            <button type="submit">Save</button>
          </form>
        </div>
        <div>
          <h2>Sign in</h2>
          <form action="" onSubmit={handleLogin}>
            <input type="email" placeholder="email" name="email" />
            <input type="text" placeholder="password" name="password" />
            <button type="submit">Login</button>
          </form>
        </div>
      </When>
      <When condition={loggedin}>
        <h1>Hello I am Authorized</h1>
      </When>
    </>
  );
}

export default Sign;
