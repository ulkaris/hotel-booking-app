import { useContext } from "react";
import { BookingContext } from "../../../context/BookingContext";
import hotels from "../../../data/hotel.json";
import meals from "../../../data/meals.json";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./index.module.css";

const DailyConfigurationForm = () => {
  const {
    initialConfig,
    dailySelections,
    setDailySelections,
    setIsDailySubmitted,
  } = useContext(BookingContext);

  const totalDays = initialConfig.numberOfDays;
  const destination = initialConfig.destination;
  const boardType = initialConfig.boardType;

  const destinationHotels = hotels[destination] || [];
  const mealOptions = meals[destination] || {};

  const isHB = boardType === "HB";
  const isNB = boardType === "NB";

  const initialValues = dailySelections.length
    ? dailySelections
    : Array.from({ length: totalDays }, () => ({
        hotel: "",
        lunch: "",
        dinner: "",
      }));

  const handleSubmit = (values) => {
    setDailySelections(values);
    setIsDailySubmitted(true);
    // console.log("Submitted values:", values);
  };

  return (
    <div className={styles.form_container}>
      <h2 className={styles.form_title}>Daily Configuration</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};

          values.forEach((day, index) => {
            const rowErrors = {};

            /* HOTEL REQUIRED */
            if (!day.hotel) {
              rowErrors.hotel = "Hotel is required";
            }

            if (!isNB) {
              /* HB - only one meal */
              if (isHB) {
                // if none is chosen - required
                if (!day.lunch && !day.dinner) {
                  rowErrors.lunch = "Choose a meal";
                }
              }

              /* FB logic */
              if (!isHB && !day.lunch) {
                rowErrors.lunch = "Lunch is required";
              }
              if (!isHB && !day.dinner) {
                rowErrors.dinner = "Dinner is required";
              }
            }

            if (Object.keys(rowErrors).length > 0) {
              errors[index] = rowErrors;
            }
          });

          return errors;
        }}
        validateOnChange={false}
        validateOnBlur={false}>
        {({ values, setFieldValue }) => (
          <Form>
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
                {values.map((day, i) => (
                  <tr key={i}>
                    <td>Day {i + 1}</td>

                    {/* Hotel dropdown */}
                    <td>
                      <Field
                        as="select"
                        name={`${i}.hotel`}
                        className={styles.select}>
                        <option value="">Select hotel</option>
                        {destinationHotels.map((h) => (
                          <option key={h.id} value={h.name}>
                            {h.name} (${h.price})
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name={`${i}.hotel`}
                        component="div"
                        className={styles.error}
                      />
                    </td>

                    {/* Lunch dropdown */}
                    <td>
                      <Field
                        as="select"
                        name={`${i}.lunch`}
                        disabled={isNB}
                        className={styles.select}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue(`${i}.lunch`, value);
                          if (isHB) {
                            setFieldValue(`${i}.dinner`, "");
                          }
                        }}>
                        <option value="">Select lunch</option>
                        {mealOptions.lunch?.map((m) => (
                          <option key={m.id} value={m.name}>
                            {m.name} (${m.price})
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name={`${i}.lunch`}
                        component="div"
                        className={styles.error}
                      />
                    </td>

                    {/* Dinner dropdown */}
                    <td>
                      <Field
                        as="select"
                        name={`${i}.dinner`}
                        disabled={isNB}
                        className={styles.select}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue(`${i}.dinner`, value);
                          if (isHB) {
                            setFieldValue(`${i}.lunch`, "");
                          }
                        }}>
                        <option value="">Select dinner</option>
                        {mealOptions.dinner?.map((m) => (
                          <option key={m.id} value={m.name}>
                            {m.name} (${m.price})
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name={`${i}.dinner`}
                        component="div"
                        className={styles.error}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.btn_submit_wrapper}>
              <button type="submit" className={styles.btn_submit}>
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DailyConfigurationForm;
