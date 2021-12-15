import React, { useState } from 'react'
import './style.css';
import { Link } from 'react-router-dom';
import axiox from "axios";

export default function Login(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const sendForm = async (e) => {
    e.preventDefault();

    axiox
      .post("http://localhost:8080/api/auth/signin", {
        username,
        password,
      })
      .then((response) => {
        console.log("response", response);
        if (response.data.result.success) {
          setError("")
          localStorage.setItem(
            "token",
            response.data.result.token
          );
          props.history.push("/");
          window.location.reload();
        }
      })
      .catch((error) =>
        setUsername(""),
        setPassword(""),
        setError("Username or password incorrect")
      );
  }

  return (
    <div>
      <form name="my_form" className="form" method="post" onSubmit={sendForm}>
        <br /><h2>Sign In</h2><br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username"></input><br />
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input><br /><br />
        <input type="submit" name="" className="btn1" value="submit"></input>
        <p>
          Don't have an account? Then please <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  )
}

