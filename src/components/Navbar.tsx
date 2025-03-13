import "../scss/App.scss";
import "../scss/Header.scss";
import "../scss/Jumbotron.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import HomePage from "../components/HomePage";
import ProtectedRoute from "../components/ProtectedRoute";
import SpotifyCallback from "../components/widgets/spotify/SpotifyCallback";
import Welcome from "../components/Welcome";

const Navbar = ({ isMenuOpen, size, handleLogin, handleRegister, handleLogout, isAuthenticated, username }) => {
  return (
    <>
      <header>
        <div>
          <nav className="navbar">
            {/*  <span className="navbar__app-name"><Link to="/">Sentient</Link></span>*/}
            {/*<div className="navbar__logo"><Link to="/">*/}
            {/*    /!*<EmotionCycler /></Link>*!/*/}
            {/*</div>*/}

            {!isMenuOpen && (<Link className="navbar__links-left" to="/">
              <div className="logo-image"></div>
              <div className="logo-title"></div>
            </Link>)}
              {(size !== "small"  || isMenuOpen) && <div  className="navbar__links-middle">
              <button className="navbar__link">How it works</button>
              <button className="navbar__link">About Us</button>
              <button className="navbar__link">Contact Us</button>
            </div>}
            <div className="navbar__links-right">
              {(size !== "small"  || isMenuOpen) && !isAuthenticated && (
                <Link className="navbar__link-button" to="/register">Sign Up</Link>
              )}
              {(size !== "small"  || isMenuOpen) &&  !isAuthenticated && (
                <Link className="navbar__link-button navbar__link-button-change" to="/login">Login</Link>
              )}
              {(size === "small"  || isMenuOpen) && isAuthenticated && (
                <button className="navbar__link-button" onClick={handleLogout}>
                  Logout
                </button>
              )}
                    </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
