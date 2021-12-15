import React, { useState } from 'react'
import './style.css';
import axiox from "axios";
import { Link } from 'react-router-dom';

export default function Signup(props) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const sendForm = async (e) => {
    e.preventDefault();
    console.log(e)
    axiox
      .post("http://localhost:8080/api/auth/signup", {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log("response", response);
        if (response?.data?.result?.success) {
          setError("");
          localStorage.setItem(
            "token",
            response.data.result.token,
          );
          props.history.push('/');
          window.location.reload();
        } else {
          setError(response.data.result.message)
        }
      })
      .catch((error) => {
        console.log('error', error)
      });
  }

  return (
    <div>
      <form name="my_form" className="form" method="post" onSubmit={sendForm}>
        <br /><h2>Sign Up</h2><br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="New username"></input><br />
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="New email"></input><br />
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="New password"></input><br /><br />
        <input type="submit" name="" className="btn1" value="submit"></input>
        <p>
          Already have an account? Then please <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}
