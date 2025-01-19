import React, { useState } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Error from "../components/Error";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function Login() {
    setLoading(true);
    const user = {
      email,
      password,
    };
    try {
      const result = (await axios.post("https://backend.deepakdenre.live/api/users/login" || "http://backend.deepakdenre.live/api/users/login", user)).data;
      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {
      setError("Invalid Credentials");
    }
    setLoading(false);
  }

  return (
    <div className="login-container">
      {loading && <Loader />}
      
      <div className="login-box">
        {error.length > 0 && <Error msg={error} />}
        <h2>Login</h2>
        <input
          type="email"
          className="form-control input-field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loading ? (
          <div>Logging in... Please Wait...</div>
        ) : (
          <button
            className="btn btn-primary mt-3 btn-login"
            onClick={Login}
          >
            Login
          </button>
        )}
      </div>

      <style jsx>{`
        .login-container {
          background: linear-gradient(135deg, #f9f9f9, #b1d4e0);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .login-box {
          background: #fff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
          margin: 0 20px;
        }

        .input-field {
          margin-bottom: 15px;
          border-radius: 5px;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          transition: 0.3s ease-in-out;
          width: 100%;
        }

        .input-field:focus {
          border-color: #4e73df;
          box-shadow: 0 0 5px rgba(79, 115, 223, 0.5);
        }

        .btn-login {
          width: 100%;
          padding: 12px;
          background: #4e73df;
          border: none;
          border-radius: 5px;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .btn-login:hover {
          background: #3e5db6;
        }

        @media (max-width: 768px) {
          .login-box {
            padding: 20px;
            max-width: 90%;
          }

          .input-field {
            font-size: 14px;
          }

          .btn-login {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .login-box {
            max-width: 100%;
          }

          .input-field {
            font-size: 13px;
            padding: 10px;
          }

          .btn-login {
            font-size: 13px;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default LoginScreen;
