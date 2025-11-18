// import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./index.module.css";
import countries from "../../../data/country.json";
import boardTypes from "../../../data/boardType.json";

import { useContext } from "react";
import { BookingContext } from "../../../context/BookingContext";

const schema = Yup.object().shape({
  citizenship: Yup.string().required("Please select your citizenship"),
  startDate: Yup.date().required("Start date is required").nullable(),
  numberOfDays: Yup.number()
    .required("Number of days is required")
    .min(1)
    .max(30),
  destination: Yup.string().required("Please select your destination"),
  boardType: Yup.string().required("Please select a board type"),
});

const InitialConfigurationForm = () => {
  const today = new Date().toISOString().split("T")[0];
  const { setInitialConfig, setIsInitialSubmitted } =
    useContext(BookingContext);

  const initialValues = {
    citizenship: "",
    startDate: "",
    numberOfDays: 1,
    destination: "",
    boardType: "FB",
  };

  const handleSubmit = (values) => {
    setInitialConfig(values);
    console.log("Form submitted with values:", values);
    setIsInitialSubmitted(true);
  };

  return (
    <div className={styles.form_container}>
      <h2 className={styles.form_title}>Start Your Booking</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}>
        {() => (
          <Form className={styles.form}>
            {/* Citizenship */}
            <div className={styles.form_group}>
              <label className={styles.label}>Citizenship</label>
              <Field as="select" name="citizenship" className={styles.select}>
                <option value="">Select your country</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="citizenship"
                component="div"
                className={styles.error}
              />
            </div>

            {/* Start Date */}
            <div className={styles.form_group}>
              <label className={styles.label}>Start Date</label>
              <Field
                type="date"
                name="startDate"
                className={styles.input}
                min={today}
              />
              <ErrorMessage
                name="startDate"
                component="div"
                className={styles.error}
              />
            </div>

            {/* Number of Days */}
            <div className={styles.form_group}>
              <label className={styles.label}>Number of Days</label>
              <Field
                type="number"
                name="numberOfDays"
                min={1}
                max={30}
                className={styles.input}
              />
              <ErrorMessage
                name="numberOfDays"
                component="div"
                className={styles.error}
              />
            </div>

            {/* Destination */}
            <div className={styles.form_group}>
              <label className={styles.label}>Destination Country</label>
              <Field as="select" name="destination" className={styles.select}>
                <option value="">Select a destination</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="destination"
                component="div"
                className={styles.error}
              />
            </div>

            {/* Board Type */}
            <div className={styles.form_group}>
              <label className={styles.label}>Board Type</label>
              <div className={styles.radioGroup}>
                {boardTypes.map((b) => (
                  <label key={b.code}>
                    <Field type="radio" name="boardType" value={b.code} />
                    {b.name}
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="boardType"
                component="div"
                className={styles.error}
              />
            </div>

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

export default InitialConfigurationForm;
