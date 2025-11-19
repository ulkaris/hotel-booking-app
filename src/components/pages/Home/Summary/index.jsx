import { useContext, useEffect } from "react";
import { BookingContext } from "../../../../context/BookingContext";
import hotels from "../../../../data/hotel.json";
import meals from "../../../../data/meals.json";
import styles from "./index.module.css";
import html2pdf from "html2pdf.js";

const Summary = () => {
  const { initialConfig, dailySelections, totalPrice, setTotalPrice } =
    useContext(BookingContext);

  const destinationHotels = hotels[initialConfig.destination] || [];
  const mealOptions = meals[initialConfig.destination] || {};

  const getHotelPrice = (hotelName) => {
    return destinationHotels.find((h) => h.name === hotelName)?.price || 0;
  };

  const getMealPrice = (type, mealName) => {
    return mealOptions[type]?.find((m) => m.name === mealName)?.price || 0;
  };

  //download summary as pdf
  const handleDownloadPDF = () => {
    const element = document.getElementById("summaryPDF");

    const options = {
      margin: 0.5,
      filename: "booking-summary.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  useEffect(() => {
    let total = 0;

    dailySelections.forEach((day) => {
      const hotelPrice = getHotelPrice(day.hotel);
      const lunchPrice = getMealPrice("lunch", day.lunch);
      const dinnerPrice = getMealPrice("dinner", day.dinner);

      total += hotelPrice + lunchPrice + dinnerPrice;
    });

    setTotalPrice(total);
  }, [dailySelections]);

  return (
    <>
      <div id="summaryPDF" className={styles.summary_container}>
        <div>
          <h2 className={styles.title}>Summary</h2>

          <section className={styles.section}>
            <p>
              <strong>Citizenship:</strong> {initialConfig.citizenship}
            </p>
            <p>
              <strong>Start Date:</strong> {initialConfig.startDate}
            </p>
            <p>
              <strong>Total Days:</strong> {initialConfig.numberOfDays}
            </p>
            <p>
              <strong>Destination:</strong> {initialConfig.destination}
            </p>
            <p>
              <strong>Board Type:</strong> {initialConfig.boardType}
            </p>
          </section>
        </div>

        {/* Daily Selections */}
        <section className={styles.section}>
          <h3>Daily Selections</h3>
          <div className={styles.summary_grid}>
            {dailySelections.map((day, i) => {
              const hotelPrice = getHotelPrice(day.hotel);
              const lunchPrice = getMealPrice("lunch", day.lunch);
              const dinnerPrice = getMealPrice("dinner", day.dinner);

              return (
                <div key={i} className={styles.dayCard}>
                  <h4>Day {i + 1}</h4>
                  <p>
                    <strong>Hotel:</strong> {day.hotel} (${hotelPrice})
                  </p>
                  <p>
                    <strong>Lunch:</strong> {day.lunch || "-"}{" "}
                    {lunchPrice ? `($${lunchPrice})` : ""}
                  </p>
                  <p>
                    <strong>Dinner:</strong> {day.dinner || "-"}{" "}
                    {dinnerPrice ? `($${dinnerPrice})` : ""}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Total Price */}
        <section className={styles.section}>
          <h3>Total Price</h3>
          <h2 className={styles.total}>${totalPrice}</h2>
        </section>
      </div>
      <button className={styles.pdf_btn} onClick={handleDownloadPDF}>
        Download PDF
      </button>
    </>
  );
};

export default Summary;
