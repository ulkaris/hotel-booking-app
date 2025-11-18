import styles from "./index.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InitialConfigurationForm from "../../components/Forms/InitialConfigurationForm";
import DailyConfigurationForm from "../../components/Forms/DailyConfigurationForm";
import { useContext } from "react";
import { BookingContext } from "../../context/BookingContext";

function Home() {
  const { isInitialSubmitted } = useContext(BookingContext);
  return (
    <div className={styles.container}>
      <Header />
      {isInitialSubmitted ? (
        <DailyConfigurationForm />
      ) : (
        <InitialConfigurationForm />
      )}

      <Footer />
    </div>
  );
}

export default Home;
