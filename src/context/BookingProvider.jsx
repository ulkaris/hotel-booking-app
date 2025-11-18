import { useState } from "react";
import { BookingContext } from "./BookingContext";

const BookingProvider = ({ children }) => {
  const [initialConfig, setInitialConfig] = useState({
    citizenship: "",
    startDate: "",
    numberOfDays: "",
    destination: "",
    boardType: "",
  });

  const [dailySelections, setDailySelections] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isInitialSubmitted, setIsInitialSubmitted] = useState(false);

  const value = {
    initialConfig,
    setInitialConfig,
    dailySelections,
    setDailySelections,
    totalPrice,
    setTotalPrice,
    isInitialSubmitted,
    setIsInitialSubmitted,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export default BookingProvider;
