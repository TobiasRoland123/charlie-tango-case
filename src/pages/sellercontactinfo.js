import Head from "next/head";
import Anchor from "@/components/Header/Anchor";
import styles from "./Home.module.css";
import { estateTypes } from "@/data/estateTypes";
import { Input, InputNumber, Select } from "antd";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import VisualSteps from "../components/VisualSteps";
import { SellerInformation } from "./_app";

export default function EstateDetails() {
  //States
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [zip, setZip] = useState("");
  const [zipValidator, setZipValidator] = useState("");
  const [estateType, setEstateType] = useState("");
  const [sellerDetails, setSellerDetails] = useContext(SellerInformation);
  let estateDetails;

  //Routers
  const router = useRouter();

  //UseEffect for the ZipCode validator
  useEffect(() => {
    fetch(`https://api.dataforsyningen.dk/postnumre/${zip}`)
      .then((res) => res.json())
      .then((data) => {
        setZipValidator(data);
      });
  }, [zip]);

  //Const for changing states
  const priceChanged = (e) => {
    console.log(e);
    setPrice(e);
  };

  const sizeChanged = (e) => {
    // console.log(e);
    setSize(e);
  };

  const zipChanged = (e) => {
    // console.log(e);
    setZip(e);
  };
  const estateChanged = (e) => {
    // console.log("hvad er e?", e.target);
    // console.log(estateTypes[0].name);
    // console.log(estateTypes.length);
    for (let i = 0; i < estateTypes.length; i++) {
      if (e === estateTypes[i].name) {
        setEstateType(estateTypes[i].id);
      }
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    estateDetails = {
      price,
      size,
      zip,
      estateType,
    };

    {
      !zipValidator.navn
        ? alert("ZipCode not Valid")
        : updateSellerInformation();
    }

    function updateSellerInformation() {
      setSellerDetails({
        price: price,
        size: size,
        zip: zip,
        estateType: estateType,
      });
      router.push(
        `${e.target.action}?price=${price}&size=${size}&zipCode=${zip}`
      );
    }
    //Update useContext
  }
  return (
    <>
      <Head>
        <title>Estate Details | EDC</title>
      </Head>
      <VisualSteps step={2} />
      <div className="wrapper">
        <h1 className={styles.headline}>1. Estate Details</h1>
        <div className={styles.content}>
          <p>
            First off, let us know a little bit more about your estate by filing
            out the details below.
          </p>
        </div>
        <div className={styles.content}>
          <h2>Basic form example</h2>
          <p>
            This is simple example of how you could submit a form to another
            page in Next.js, without using a custom <code>submit</code> function
            (e.g. without JavaScript). It is unstyled and unfinished. You can
            use this as base, or implement your own solution.
          </p>
          <p>
            Make sure to read the guide on{" "}
            <a
              href="https://nextjs.org/docs/guides/building-forms"
              target="_blank"
            >
              building forms in Next.js
            </a>
          </p>
          {/* Hvis der er Ændringer på denne side, skal vores gererede Object med de producerede værdier slettes. */}
          <form
            onSubmit={onSubmit}
            action="/done"
            method="GET"
            className={styles.form}
          >
            <label>
              <span className={styles.label}>Name</span>
              <Input
                className={styles.formInput}
                name="Name"
                // formatter={(value) =>
                //   `${value} DKK`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                // }
                // parser={(value) => value.replace(/\s?DKK\s?|(\.)+/g, "")}
                onChange={priceChanged}
                value={price}
                required
              />
            </label>
            <label>
              <span className={styles.label}>
                Size in m<sup>2</sup>
              </span>
              <InputNumber
                className={styles.formInput}
                name="size"
                type="number"
                onChange={sizeChanged}
                value={size}
                required
              />
            </label>
            <label>
              <span className={styles.label}>Zip Code</span>
              <InputNumber
                className={styles.formInput}
                name="zipCode"
                type="number"
                onChange={zipChanged}
                value={zip}
                required
              />
            </label>
            <label>
              <span className={styles.label}>Estate type</span>
              <Select className={styles.formInput} onChange={estateChanged}>
                {estateTypes.map((estate) => (
                  <Select.Option key={estate.name} id={estate.id}>
                    {estate.name}
                  </Select.Option>
                ))}
              </Select>
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
