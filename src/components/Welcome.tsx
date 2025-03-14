import { Link } from "react-router-dom";
import "../scss/Welcome.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const cardData = [
  {
    iconClass: "welcome__card__icon welcome__card__icon--1",
    title: "Mood Detection",
    description:
      "Simply activate your camera (with privacy control), and Sentient will automatically detect your mood to deliver personalized motivational quotes and keeping you focused and inspired.",
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
      "Create and customize your daily tasks. Sentient helps prioritize them based on your schedule and productivity patterns, ensuring nothing gets missed.",
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
        <div className="welcome__left--1">
          <h1 className="welcome__title">
            Your personalised path to productivity
          </h1>
          <h3 className="welcome__para welcome__jumbotron">
            Your mood, your music, your motivation - powered by AI
          </h3>
          <div className="welcome__buttons">
            <Link to="/register" className="btn btn-primary">
              Get started
            </Link>
            {/*<Link to="/login" className="btn btn-secondary">Login</Link>*/}
          </div>
        </div>
        <div className="welcome__right--1">
          <div className="welcome__image__block"></div>
          <div className="welcome__image"></div>
          {/*    Image hereeeeee */}
        </div>
      </div>
      <div className="welcome__section welcome-section--2" id="section--2">
        <h3 className="welcome__title welcome-bold">How it works?</h3>
        <div className="welcome__bar"></div>
        <div className="welcome__cards">
          {cardData.map((card, index) => (
            <div className="welcome__card" key={index}>
              <div className={card.iconClass}></div>
              <div className="welcome__card__title welcome-bold">
                {card.title}
              </div>
              <div className="welcome__para">{card.description}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="welcome__section welcome__section--3">
        <div className="welcome__left--3">
          <div className="welcome__title welcome-bold">
            Ready to Supercharge Your Productivity?
          </div>
          <div className="welcome__buttons">
            <Link to="/register" className="btn btn-primary">
              Try for free
            </Link>
          </div>
        </div>

        <div className="welcome__right--3">
          <div className="welcome__image-banner"></div>
        </div>
      </div>
      <div className="welcome__section welcome__section--4">
        <h3 className="welcome__title welcome-bold">About Us</h3>
        <div className="welcome__bar"></div>
        <div className="welcome__section--4-content">
        <div className="welcome__left--4">
          <div className="welcome__para">
            <div className="welcome__line">
              Picture this… you're facing a long day, feeling unfocused and
              unmotivated.
            </div>
            <div className="welcome__line">
              Tasks are piling up, music feels off, and you can't seem to find
              your rhythm. We get it, staying productive is tough.
            </div>
            <div className="welcome__line">
              That's why we created Sentient an AI-powered dashboard designed to
              understand your mood and help you stay inspired and organized,
              every single day.
            </div>
            <div className="welcome__line">
              Here's what Sentient stands for:
              <ul className="welcome__list">
                <li><span>
                  <span className="welcome-bold">
                    Personalized Motivation:{" "}
                  </span>{" "}
                  analyzes your mood and delivers tailored quotes to keep you
                  inspired.
                </span>
                </li>
                <li>
                  <span>
                  <span className="welcome-bold">Task Clarity: </span> to-do
                  lists that help you stay focused and productive.
                  </span>
                </li>
                <li>
                  <span>
                  <span className="welcome-bold">
                    Seamless Music Integration:{" "}
                  </span>{" "}
                    to Spotify or YouTube and listen to playlists that match your
                  vibe.
                  </span>
                </li>
                <li>
                  <span>
                  <span className="welcome-bold">Smart Scheduling: </span> track
                  of tasks and events with an integrated calendar.
                  </span>
                </li>
                <li>
                  <span>
                  <span className="welcome-bold">Weather Updates: </span> what
                  to expect for the day ahead.
                  </span>
                </li>
              </ul>
              <div className="welcome__line">
                Sentient was created to empower individuals to be their most productive and inspired selves
                because when your mood and mind are in sync, anything is possible.
              </div>
          </div>
        </div>
        </div>
        <div className="welcome__right--4">
          <div className="logo-image welcome__logo--4"></div>
          <div className="logo-title welcome__title"></div>
        </div>
        </div>
      </div>
      <div className="welcome__section welcome__section--5">
        <div className="welcome__section--5-logo">
          <div className="welcome__logo--5  logo-image"></div>
          <div className="logo-title welcome__title"></div>
        </div>
        <div className="welcome__section--5-logo">
        </div>
        <div className="welcome__section--5_box">
          <div className="welcome__section--5_box-left">
          </div>
          <div className="welcome__section--5_box-middle">
            <div className="welcome__section--5_box-middle-text">
              Made by:
            </div>
            <div className="welcome__section--5_box-middle-linkedin">
              <a href="https://www.linkedin.com/in/setayesh-abbasi-moghadam/"><FontAwesomeIcon icon={faLinkedin} />
              Setayesh Abbasi Moghadam</a>
              <a href="https://www.linkedin.com/in/vennilasooben/"><FontAwesomeIcon icon={faLinkedin} />
                Vennila Sooben</a>
            </div>

          </div>
          <div className="welcome__section--5_box-right">
          </div>
        </div>

      </div>
    </div>
  );
};

export default Welcome;
