import "../scss/LoginRegister.scss";
import { useState } from "react";

function Register({
  onRegister,
}: {
  onRegister: (token: string, username: string) => void;
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.user && data.user.authentication && data.user.username) {
        onRegister(data.user.authentication.token, data.user.username);
        setIsAuthenticated(true);
      } else {
        console.error("Invalid response:", data);
      }
      console.log(data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  if (isAuthenticated) {
    return null; // Hide the login form if authenticated
  }
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form__title">Register page</h1>
        <input
          className="form__elem form__elem__username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
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
        <button className="form__elem form__elem__submit-button" type="submit">
          Register
        </button>
      </form>
    </>
  );
}

export default Register;
