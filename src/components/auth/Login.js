import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogin } from "../../hooks/useLogin";

import "./css/Login.css";

export function LoginPage() {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const { login, error, isLoading } = useLogin(dispatch);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(emailRef.current.value, passwordRef.current.value);
  };

  useEffect(() => {
    if (!isLoading && error === null) {
      // Redirect to home page
      navigate("/");
    }
  }, [isLoading, error, navigate]);

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit} autoComplete="on">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              ref={emailRef}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              ref={passwordRef}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
      <div className="mt-2">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
