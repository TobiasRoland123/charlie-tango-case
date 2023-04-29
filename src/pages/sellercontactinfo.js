import Head from "next/head";
import VisualSteps from "@/components/VisualSteps";
import styles from "./Home.module.css";
import { Input } from "antd";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { SellerInformation } from "./_app";
import { DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
//Unique ID generator

export default function EstateDetails() {
  //states and useContext
  const [sellerDetails, setSellerDetails] = useContext(SellerInformation);
  const [theBuyers, setTheBuyers] = useState(sellerDetails.buyers);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  //routers
  const router = useRouter();

  // console.log("theBuyers", theBuyers);

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
    //Unique ID generator
    setSellerDetails((prev) => ({
      //takes what was in object, and adds name, email, phone and consent

      ...prev,
      buyers: theBuyers,
      name,
      email,
      phone,
      consent,
      seller_id: uuidv4(),
    }));

    router.push(e.target.action);
  }

  // console.log("sellerDetails", sellerDetails.buyers);

  function updateBuyers(id) {
    console.log(id);
    // console.log(seller);
    const updatedBuyers = theBuyers.map((buyer) => {
      if (buyer.id === id) {
        const newBuyer = { ...buyer };
        newBuyer.chosen = false;
        return newBuyer;
      }
      return buyer;
    });

    setTheBuyers(updatedBuyers);
    // buyer.chosen = true;
    //     } else if (buyer.id === id && buyer.chosen === true) {
    //       const newBuyer = { ...buyer };
    //       console.log(newBuyer);
    //       newBuyer.chosen = false;
    //       console.log(newBuyer);
    //       return newBuyer;
    //     }
    //     return buyer;
    //   });

    //   setSellerDetails((sellerDetails.buyers = updatedBuyers));
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
            <div>
              <ul>
                {theBuyers.map((buyer) =>
                  buyer.chosen ? (
                    <li key={buyer.id}>
                      <span>Buyer ID: {buyer.id}</span>
                      <DeleteOutlined onClick={() => updateBuyers(buyer.id)} />
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
