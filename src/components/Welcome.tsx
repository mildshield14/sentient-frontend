import { Link } from "react-router-dom";
import "../scss/Welcome.scss";

const cardData = [
  {
    iconClass: "welcome__card__icon welcome__card__icon--1",
    title: "Mood Detection",
    description:
      "Simply activate your camera (with privacy control), and Sentium will automatically detect your mood to deliver personalized motivational quotes and keeping you focused and inspired.",
  },
  {
    iconClass: "welcome__card__icon welcome__card__icon--2",
    title: "Media & Integration",
    description:
      "Connect your Spotify or YouTube accounts to create the perfect productivity playlist. Switch tracks, pause, and manage your music directly from the dashboard.",
  },
  {
    iconClass: "welcome__card__icon welcome__card__icon--2",
    title: "Customisable To-Do Lists",
    description:
      "Create and customize your daily tasks. Sentium helps prioritize them based on your schedule and productivity patterns, ensuring nothing gets missed.",
  },
  {
    iconClass: "welcome__card__icon welcome__card__icon--2",
    title: "Smart scheduling & Weather",
    description:
      "Sync with your calendar to view upcoming events and get real-time weather updates, so you're always ready for what's next.",
  },
];

const Welcome: React.FC = () => {
  return (
    <div className="welcome">
      <div className="welcome__section welcome__section--1">
        <div className="welcome__left">
          <h1 className="welcome__title">
            Your personalised path to productivity
          </h1>
          <h3 className="welcome__para">
            Your mood, your music, your motivation - powered by AI
          </h3>
          <div className="welcome__buttons">
            <Link to="/register" className="btn btn-primary">
              Get started
            </Link>
            {/*<Link to="/login" className="btn btn-secondary">Login</Link>*/}
          </div>
        </div>
        <div className="welcome__right">
          <div className="welcome__image__block"></div>
          <div className="welcome__image"></div>
          {/*    Image hereeeeee */}
        </div>
      </div>
      <div className="welcome__section">
        <h3 className="welcome__title welcome-bold">How it works?</h3>
        <div className="welcome__bar"></div>
        <div className="welcome__cards">
          {cardData.map((card, index) => (
            <div className="welcome__card" key={index}>
              <div className={card.iconClass}></div>
              <div className="welcome__card__title">{card.title}</div>
              <div className="welcome__para">{card.description}</div>
            </div>
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Welcome;
