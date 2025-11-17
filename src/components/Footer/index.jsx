import styles from "./index.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top_section}>
        <div className={styles.info_block}>
          <h4>About Us</h4>
          <p>
            StayEase is your trusted platform for booking hotels, flights, and
            cars worldwide.
          </p>
        </div>
        <div className={styles.info_block}>
          <h4>Customer Service</h4>
          <p>Email: support@stayease.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
        <div className={styles.info_block}>
          <h4>Follow Us</h4>
          <p>
            <a href="#">Facebook</a> | <a href="#">Twitter</a> |{" "}
            <a href="#">Instagram</a>
          </p>
        </div>
      </div>

      <div className={styles.bottom_section}>
        <p>© 2025 StayEase. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
