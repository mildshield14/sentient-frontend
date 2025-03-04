import React from 'react';
import { Link } from 'react-router-dom';
import "../scss/Welcome.scss"
const Welcome: React.FC = () => {
    return (
        <div className="welcome">
            <h1>Welcome to Sentient</h1>
            <p>Your personalized emotion-based experience.</p>
            <div className="welcome__buttons">
                <Link to="/register" className="btn btn-primary">Register</Link>
                <Link to="/login" className="btn btn-secondary">Login</Link>
            </div>
        </div>
    );
};

export default Welcome;