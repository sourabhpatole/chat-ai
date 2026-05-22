import { Link } from "react-router-dom";
import "./homePage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const HomePage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");
  return (
    <div className="homePage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>Go AI</h1>
        <h2>Your intelligent partner </h2>
        <h3>
          Generate content, write code, solve problems, and explore ideas
          instantly with AI.
        </h3>
        <Link to="/dashboard">Explore AI</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="bot.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "human1"
                  ? "human1.jpeg"
                  : typingStatus === "human2"
                    ? "human2.jpeg"
                    : "bot.png"
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                "Human: How can AI help me code faster?",
                2000,
                () => {
                  setTypingStatus("bot");
                },

                "Bot: I can generate code, debug errors, and explain concepts instantly.",
                2000,
                () => {
                  setTypingStatus("human2");
                },

                "Human2: Can you create React components too?",
                2000,
                () => {
                  setTypingStatus("bot");
                },

                "Bot: Yes! I can build modern React UI with clean and reusable code.",
                2000,
                () => {
                  setTypingStatus("human1");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="logo.png" alt="" />
        <div className="links">
          <Link to="/">Terms of Services</Link>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
