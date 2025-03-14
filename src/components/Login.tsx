import { useState } from "react";
import "../scss/LoginRegister.scss";
import { Link } from "react-router-dom";

function Login({
  onLogin,
}: {
  onLogin: (token: string, username: string) => void;
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_DOMAIN}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include"
      });
      const data = await response.json();
      if (data.user && data.user.authentication && data.user.username) {
        onLogin(data.user.authentication.token, data.user.username);
        setIsAuthenticated(true);
        setErrorMessage(null);
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
        console.error("Invalid response:", data);
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
      console.error("Login failed:", error);
    }
  };

  if (isAuthenticated) {
    return null; // Hide the login form if authenticated
  }

  return (
      <>
        <div className="form__logo-box">
          <div className="form__logo logo-image"></div>
          <div className="logo-title"></div>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="form__title">Welcome Back!</h1>
          <input
              className="form__elem form__elem__email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
          />
          <input
              className="form__elem form__elem__pwd"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
          />
          {errorMessage && <div className="form__error">{errorMessage}</div>}
          <button className="form__elem form__elem__submit-button" type="submit">
            Log In
          </button>
          <div className="form__link-text" >Don't have an account? <span><Link className="form__link" to="/register">Sign Up</Link></span></div>
        </form>
      </>
  );
}

export default Login;
