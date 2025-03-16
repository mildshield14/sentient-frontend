import "./scss/App.scss";
import "./scss/Header.scss";
import "./scss/Jumbotron.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Logo from "./components/Logo";
import { useEffect, useRef, useState } from "react";
import HomePage from "./components/HomePage";
import useElementSize from "./hook/useElementSize";
import ProtectedRoute from "./components/ProtectedRoute";
import SpotifyCallback from "./components/widgets/spotify/SpotifyCallback";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  // Define breakpoints
  const breakpoints = {
    small: { min: 300, max: 599 },
    medium: { min: 600, max: 899 },
    large: { min: 900, max: 1399 },
    extra: { min: 1400, max: Infinity },
  };

  const size = useElementSize(ref, breakpoints);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token: string,  id: string) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    setId(id);
  };

  const handleRegister = (token: string, id: string) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    setId(id);
  };

  return (
    <Router>
      <div className={`${size} app`} ref={ref}>
        <AppContent
          isAuthenticated={isAuthenticated}
          id={id}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          setIsAuthenticated={setIsAuthenticated}
          setId={setId}
          size={size ? size : "small"}
        />
      </div>
    </Router>
  );
}

const AppContent = ({
  isAuthenticated,
 id,
  handleLogin,
  handleRegister,
  setIsAuthenticated,
  setId,
  size,
}: {
  isAuthenticated: boolean;
  id: string | null;
  handleLogin: (token: string,id: string) => void;
  handleRegister: (token: string, id: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setId: (id: string | null) => void;
  size: string;
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/home`);
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setId(null);
    navigate("/register");
  };

  useEffect(() => {
    const token =
      localStorage.getItem("authToken")
    if (token ) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (size !== "small" && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [size]);

  return (
    <>
      <div>
        {/*  <span className="navbar__app-name"><Link to="/">Sentient</Link></span>*/}
        {/*<div className="navbar__logo"><Link to="/">*/}
        {/*    /!*<EmotionCycler /></Link>*!/*/}
        {/*</div>*/}

        {/*<Link className="navbar__links-left" to="/">*/}
        {/*  <div className="logo-image"></div>*/}
        {/*  <div className="logo-title"></div>*/}
        {/*</Link>*/}
        {/*  {size !== "small" && <div  className="navbar__links-middle">*/}
        {/*  <div>How it works</div>*/}
        {/*  <div>About Us</div>*/}
        {/*  <div>Contact Us</div>*/}
        {/*</div>}*/}
        {/*<div className="navbar__links-right">*/}
        {/*  {size !== "small" && !isAuthenticated && (*/}
        {/*    <Link to="/register">Sign Up</Link>*/}
        {/*  )}*/}
        {/*  {size !== "small" && !isAuthenticated && (*/}
        {/*    <Link to="/login">Login</Link>*/}
        {/*  )}*/}
        {/*  {size !== "small" && isAuthenticated && (*/}
        {/*    <button className="navbar__button" onClick={handleLogout}>*/}
        {/*      Logout*/}
        {/*    </button>*/}
        {/*  )}*/}

        {!isAuthenticated && size !== "small"  && (
          <Navbar
            size={size}
            isMenuOpen={isMenuOpen}
            handleLogout={handleLogout}
            isAuthenticated={isAuthenticated}
          />
        )}

        {size === "small" &&  !isAuthenticated && (
          <div className="navbar__hamburger" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} />
            <Link className="navbar__links-left" to="/">
              <div className="logo-image"></div>
              <div className="logo-title"></div>
            </Link>
          </div>
        )}

        {isMenuOpen && size === "small" && (
          <Navbar
            size={size}
            isMenuOpen={isMenuOpen}
            handleLogout={handleLogout}
            isAuthenticated={isAuthenticated}
          />
        )}
        {/*</div>*/}
      </div>

      <Routes>
        <Route path="/" element={<Welcome />} /> {/* Root path */}
        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage id={id}  handleLogout={handleLogout} size={size}/>
            </ProtectedRoute>
          }
        />
        <Route path="/callback" element={<SpotifyCallback />} />
      </Routes>
    </>
  );
};

export default App;
