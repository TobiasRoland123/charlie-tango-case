import Head from "next/head";
import VisualSteps from "@/components/VisualSteps";
import styles from "./Home.module.css";
import { Input } from "antd";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { SellerInformation } from "./_app";

export default function EstateDetails() {
  //states and useContext
  const [sellerDetails, setSellerDetails] = useContext(SellerInformation);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  //routers
  const router = useRouter();

  function showSellerDetails() {
    console.log(`this is the current sellerDetails: `, sellerDetails);
  }

  const nameChanged = (e) => {
    // console.log(e.target.value);
    setName(e.target.value);
  };

  const emailChanged = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const phoneChanged = (e) => {
    // console.log(e.target.value);
    setPhone(e.target.value);
  };

  const consentChanged = (e) => {
    // console.log(e.target.checked);
    setConsent(e.target.checked);
  };

  function onSubmit(e) {
    e.preventDefault();
    setSellerDetails((prev) => ({
      //takes what was in object, and adds name, email, phone and consent

      ...prev,
      name,
      email,
      phone,
      consent,
    }));

    router.push(e.target.action);
  }

  return (
    <>
      <Head>
        <title>Estate Details | EDC</title>
      </Head>

      <VisualSteps step={2} />
      <div className="wrapper">
        <h1 className={styles.headline}>3. Personal info</h1>
        <div className={styles.content}>
          <p>Please put in the asked information about yourself</p>
          <button onClick={showSellerDetails} className={styles.button}>
            Show current seller details
          </button>
        </div>

        <div className={styles.content}>
          <h2>Contact information</h2>
          <p>
            Please fill out the fields below with the mentionent Contact
            information. The information is only used, so we are able to contact
            you regarding the selling of your property.
          </p>

          <form
            onSubmit={onSubmit}
            action="done"
            method="GET"
            className={styles.form}
          >
            <label>
              <span className={styles.label}> Name </span>
              <Input
                className={styles.formInput}
                name="name"
                required
                onChange={nameChanged}
                value={name}
              />
            </label>
            <label>
              <span className={styles.label}> Email </span>
              <Input
                className={styles.formInput}
                name="email"
                required
                type="email"
                onChange={emailChanged}
                value={email}
              />
            </label>

            <label>
              <span className={styles.label}> Phone </span>
              <Input
                className={styles.formInput}
                name="phone"
                required
                type="tel"
                onChange={phoneChanged}
                value={phone}
              />
            </label>

            <label>
              <span className={styles.label}> Terms and policy shit </span>
              <input
                type="checkbox"
                id="scales"
                name="scales"
                onChange={consentChanged}
                required
              ></input>
            </label>

            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
