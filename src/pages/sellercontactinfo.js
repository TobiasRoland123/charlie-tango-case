import Head from "next/head";
import VisualSteps from "@/components/VisualSteps";
import styles from "./Home.module.css";
import { Input } from "antd";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { SellerInformation } from "./_app";
import Image from "next/image";

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
      <h1 className={styles.headline}>3. Personal info</h1>
      <VisualSteps step={2} />
      <div className="wrapper">
        <h3 className={styles.headline_explainer}>
          We&lsquo;re almost there! Please fill out your contact information.
          We&lsquo;ll contact you within 48 hours of submission.
        </h3>
        <div className={styles.content}>
          <h2>Contact information</h2>
          <div className={styles.grid_1_1}>
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
                <p className={styles.label}>
                  By checking the box you agree to our terms & condition. We may
                  store your information in up to two years.
                </p>
                <input
                  type="checkbox"
                  id="scales"
                  name="scales"
                  onChange={consentChanged}
                  required
                />
                <span>I accept EDC&lsquo;s terms and conditions.</span>
              </label>
              <button type="submit" className={styles.button}>
                Submit
              </button>
            </form>
            <Image
              className={styles.estateDetails_image}
              src="https://images.pexels.com/photos/7734593/pexels-photo-7734593.jpeg"
              alt="Three people discussing something over a table"
              placeholder="blurDataUrl"
              width="2730"
              height="3665"
            />
          </div>
        </div>
      </div>
    </>
  );
}
