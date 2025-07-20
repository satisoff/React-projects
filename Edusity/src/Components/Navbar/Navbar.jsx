import "./Navbar.css"
import logo from "../../assets/logo.png"
import menu_icon from "../../assets/menu-icon.png"
import { useEffect, useReducer, useRef, useState } from "react"
import { Link } from "react-scroll";

function Navbar() {
  const [isSticky, setSticky] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 500 ? setSticky(true) : setSticky(false);
    })
    return () => window.removeEventListener("scroll", () => {
      window.scrollY > 500 ? setSticky(true) : setSticky(false);
    });
  }, [])

  const [menuOn, setMenuOn] = useState(false);
  function toggleMenuIcon() {
    menuOn ? setMenuOn(false) : setMenuOn(true);
  }

  return (
    <nav className={`container ${isSticky ? "dark-nav" : ""}`}>
        <img src={logo} alt="Logo" className="logo"/>
        <ul className={menuOn ? "" : "hide-mobile-menu"}>
            <li><Link to="hero" smooth={true} offset={0} duration={500}>Home</Link></li>
            <li><Link to="program" smooth={true} offset={-250} duration={500}>Program</Link></li>
            <li><Link to="about" smooth={true} offset={-150} duration={500}>About us</Link></li>
            <li><Link to="campus" smooth={true} offset={-250} duration={500}>Campus</Link></li>
            <li><Link to="testimonials" smooth={true} offset={-250} duration={500}>Testimonials</Link></li>
            <li>
                <Link className="btn" to="contact" smooth={true} offset={-250} duration={500}>
                    Contact Us
                </Link>
            </li>
        </ul>
        <img src={menu_icon} alt="" className="menu-icon" onClick={toggleMenuIcon}/>
    </nav>
  )
}

export default Navbar