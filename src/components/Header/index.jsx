import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

import logo from "../../assets/images/logo.png";
import Select from "../Inputs/Select";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
// import { useContext } from "react";
// import { BookingContext } from "../../context/BookingContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const options = [
    { value: "stays", label: "Stays" },
    { value: "flights", label: "Flights" },
    { value: "cars", label: "Cars" },
  ];

  // const { initialConfig, dailySelections, totalPrice } =
  //   useContext(BookingContext);
  // console.log(initialConfig.citizenship);
  // console.log(initialConfig.destination);
  // console.log(initialConfig.startDate);
  // console.log(initialConfig.numberOfDays);
  // console.log(initialConfig.boardType);

  //   const handleChange = (selected) => {
  //     console.log("Selected value:", selected?.value);
  //   };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.logoAndSelect}>
        <a href="/">
          <img src={logo} alt="StayEase Logo" className={styles.logo} />
        </a>
        <Select
          options={options}
          placeholder="Shop travel"
          //   onChange={handleChange}
          className={styles.select_desktop}
        />
      </div>
      <nav className={styles.nav_desktop}>
        <ul className={styles.ul}>
          <a href="#">
            <li>List your property</li>
          </a>
          <a href="#">
            <li>Support</li>
          </a>
          <a href="#">
            <li>Trips</li>
          </a>
          <a href="#">
            <li>Sign in</li>
          </a>
        </ul>
      </nav>
      <HiOutlineMenuAlt3
        size={27}
        className={styles.hamburger}
        onClick={() => setMenuOpen(true)}
      />

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobile_nav_overlay}>
          <div className={styles.mobile_nav_top}>
            <a href="/">
              <img src={logo} alt="StayEase Logo" className={styles.logo} />
            </a>
            <IoClose size={35} onClick={() => setMenuOpen(false)} />
          </div>
          <ul className={styles.ul}>
            <Select
              options={options}
              placeholder="Shop travel"
              //   onChange={handleChange}
            />
            <a href="#">
              <li>Support</li>
            </a>
            <a href="#">
              <li>Trips</li>
            </a>
            <a href="#">
              <li>Sign in</li>
            </a>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
