import React from "react";
import "./footer.css";
function Footer() {
  return (
    <div className="footer-container">
      <div className="left">
        <div className="nametitle">SUMANTHLEO</div>
        <div className="footerdesc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod atque
          voluptatibus facilis quo iusto explicabo ut minus pariatur voluptas
          corrupti amet, enim fuga, eaque nam?
        </div>
      </div>
      <div className="center">
        <div className="centertitle">Useful Links</div>
        <div className="links">
          <div className="leftlinks">
            <a className="link" href="/">
              Home
            </a>
            <a className="link" href="/">
              About
            </a>
            <a href="/" className="link">
              Contact
            </a>
            <a href="/write" className="link">
              write
            </a>
            <a href="/login" className="link">
              login
            </a>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="righttitle">Contant Us.</div>
        <div className="rightdesc">
          <p>Address: near bus stand , hyderabad</p>
          <p>Phone no: 123456789</p>
          <p>Email:something@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
