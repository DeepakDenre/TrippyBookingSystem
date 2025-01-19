import React, { useState } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      setLoading(true);
      setError("");
      setSuccess("");
      try {
        const result = (await axios.post("https://backend.deepakdenre.live/api/users/register" || "http://backend.deepakdenre.live/api/users/register", user)).data;
        setSuccess(result);
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
        //redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setLoading(false);
    } else {
      alert("Password does not match!");
    }
  }

  return (
    <div className="register-container">
      {loading && <Loader />}
      {error.length > 0 && <Error msg={error} />}
      <div className="register-box">
        {success.length > 0 && <Success msg={success} />}
        <h2>Register</h2>
        <input
          type="text"
          className="form-control input-field"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          className="form-control input-field"
          placeholder="Confirm Password"
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
        />
        {loading ? (
          <div>Registering... Please Wait...</div>
        ) : (
          <button className="btn btn-primary mt-3 btn-register" onClick={register}>
            Register
          </button>
        )}
      </div>

      <style jsx>{`
        .register-container {
          background: linear-gradient(135deg, #f9f9f9, #b1d4e0);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .register-box {
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

        .btn-register {
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

        .btn-register:hover {
          background: #3e5db6;
        }

        @media (max-width: 768px) {
          .register-box {
            padding: 20px;
            max-width: 90%;
          }

          .input-field {
            font-size: 14px;
          }

          .btn-register {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .register-box {
            max-width: 100%;
          }

          .input-field {
            font-size: 13px;
            padding: 10px;
          }

          .btn-register {
            font-size: 13px;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default RegisterScreen;
