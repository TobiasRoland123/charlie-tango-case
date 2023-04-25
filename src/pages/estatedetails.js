import Head from "next/head";
import Anchor from "@/components/Header/Anchor";
import styles from "./Home.module.css";
import { estateTypes } from "@/data/estateTypes";
import { InputNumber, Select } from "antd";
import { useState } from "react";

export default function EstateDetails() {
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [zip, setZip] = useState("");
  const [estateType, setEstateType] = useState("");

  const priceChanged = (e) => {
    console.log(e);
    setPrice(e);
  };

  const sizeChanged = (e) => {
    console.log(e);
    setSize(e);
  };

  const zipChanged = (e) => {
    console.log(e);
    setZip(e);
  };
  const estateChanged = (e) => {
    console.log(e);
    console.log(estateTypes.length);
    for (let i = 0; i < estateTypes.length; i++) {
      if (e === estateTypes[i].name) {
        console.log(
          `i: ${i}, Estate type: ${estateTypes[i].name}, id: ${estateTypes[i].id}`
        );
        setEstateType(estateTypes[i].id);
      }
    }
    // Loop setEstate med estateTypes for at finde id.
  };

  function onSubmit(e) {
    e.preventDefault();
    let estateDetails = {
      price,
      size,
      zip,
      estateType,
    };

    console.log(estateDetails);
  }
  return (
    <>
      <Head>
        <title>Estate Details | EDC</title>
      </Head>
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
            action=""
            method="GET"
            className={styles.form}
          >
            <label>
              <span className={styles.label}>Price</span>
              <InputNumber
                className={styles.formInput}
                name="price"
                formatter={(value) =>
                  `${value} DKK`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace(/\s?DKK\s?|(\.)+/g, "")}
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
