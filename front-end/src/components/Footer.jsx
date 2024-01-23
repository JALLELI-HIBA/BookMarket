
import React from 'react';
import '../footer.css'; 

const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        
        <p className="footer-links">
          <a href="#" className="link-1">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </p>
        <p className="footer-company-name">Ktebi © 2023</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p><span> Rue Monji Slim </span> El kef , Tunis</p>
        </div>
        <div>
          <i className="fa fa-phone"></i>
          <p>+216 55.654.987</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p><a href="mailto:support@company.com">support@Ktebi.com</a></p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About Us</span>
          We're not just another bookstore. We're book explorers, literary matchmakers, and story architects. We believe in the power of books to transport, to teach, to ignite imaginations and mend hearts.
        </p>

      </div>
    </footer>
  );
};

export default Footer;