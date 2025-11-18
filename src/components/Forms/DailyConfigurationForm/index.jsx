import React, { useContext } from "react";
import { BookingContext } from "../../../context/BookingContext";
import hotels from "../../../data/hotel.json";
import meals from "../../../data/meals.json";
import styles from "./index.module.css";

const DailyConfigurationForm = () => {
  const { initialConfig, dailySelections, setDailySelections } =
    useContext(BookingContext);

  const totalDays = initialConfig.numberOfDays;
  const destination = initialConfig.destination;
  const boardType = initialConfig.boardType;

  const destinationHotels = hotels[destination] || [];
  const mealOptions = meals[destination] || {};

  // const isFB = boardType === "FB";
  const isHB = boardType === "HB";
  const isNB = boardType === "NB";

  const handleUpdate = (dayIndex, key, value) => {
    const updated = [...dailySelections];

    updated[dayIndex] = {
      ...updated[dayIndex],
      [key]: value,
    };

    // HB logic
    if (isHB) {
      if (key === "lunch") {
        updated[dayIndex].dinner = "";
      } else if (key === "dinner") {
        updated[dayIndex].lunch = "";
      }
    }

    setDailySelections(updated);
  };

  return (
    <div className={styles.form_container}>
      <h2 className={styles.form_title}>Daily Configuration</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Day</th>
            <th>Hotel</th>
            <th>Lunch</th>
            <th>Dinner</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: totalDays }).map((_, i) => (
            <tr key={i}>
              <td>Day {i + 1}</td>

              {/* Hotel dropdown */}
              <td>
                <select
                  className={styles.select}
                  value={dailySelections[i]?.hotel || ""}
                  onChange={(e) => handleUpdate(i, "hotel", e.target.value)}>
                  <option value="">Select hotel</option>
                  {destinationHotels.map((h) => (
                    <option key={h.id} value={h.name}>
                      {h.name} (${h.price})
                    </option>
                  ))}
                </select>
              </td>

              {/* Lunch dropdown */}
              <td>
                <select
                  disabled={isNB}
                  className={styles.select}
                  value={dailySelections[i]?.lunch || ""}
                  onChange={(e) => handleUpdate(i, "lunch", e.target.value)}>
                  <option value="">Select lunch</option>
                  {mealOptions.lunch?.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name} (${m.price})
                    </option>
                  ))}
                </select>
              </td>

              {/* Dinner dropdown */}
              <td>
                <select
                  disabled={isNB}
                  className={styles.select}
                  value={dailySelections[i]?.dinner || ""}
                  onChange={(e) => handleUpdate(i, "dinner", e.target.value)}>
                  <option value="">Select dinner</option>
                  {mealOptions.dinner?.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name} (${m.price})
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.btn}>Next</button>
    </div>
  );
};

export default DailyConfigurationForm;
