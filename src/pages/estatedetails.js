import Head from "next/head";
import Anchor from "@/components/Header/Anchor";
import styles from "./Home.module.css";
import { estateTypes } from "@/data/estateTypes";

export default function EstateDetails() {
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
          <form action="/buyers" method="GET" className={styles.form}>
            <label>
              <span className={styles.label}>Price</span>
              <input name="price" type="number" required />
            </label>
            <label>
              <span className={styles.label}>
                Size in m<sup>2</sup>
              </span>
              <input name="size" type="number" required />
            </label>
            <label>
              <span className={styles.label}>Zip Code</span>
              <input name="zipCode" type="number" maxLength={4} required />
            </label>
            <label>
              <span className={styles.label}>Estate type</span>
              <select>
                {estateTypes.map((estate) => (
                  <option key={estate.name} id={estate.id}>
                    {estate.name}
                  </option>
                ))}
              </select>
            </label>
            <button className={styles.button}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
