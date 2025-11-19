import styles from "./index.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InitialConfigurationForm from "../../components/Forms/InitialConfigurationForm";
import DailyConfigurationForm from "../../components/Forms/DailyConfigurationForm";
import Summary from "../../components/pages/Home/Summary";
import { useContext } from "react";
import { BookingContext } from "../../context/BookingContext";

function Home() {
  const { isInitialSubmitted, isDailySubmitted } = useContext(BookingContext);
  return (
    <div className={styles.container}>
      <Header />
      {!isInitialSubmitted && <InitialConfigurationForm />}
      {isInitialSubmitted && !isDailySubmitted && <DailyConfigurationForm />}
      {isInitialSubmitted && isDailySubmitted && <Summary />}

      <Footer />
    </div>
  );
}

export default Home;
