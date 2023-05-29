import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark">
      <div className="container text-center">
        <span className="text-muted">
          <Link to="/privacy-policy" className="footer-link">
            Privacy Policy
          </Link>{" "}
          | Version 1.0.0 |{" "}
          <a href="https://www.metropolitan.ac.rs" className="footer-link">
            Metropolitan University
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
