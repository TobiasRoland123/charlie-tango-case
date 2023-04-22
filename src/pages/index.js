import Head from "next/head";
import Anchor from "@/components/Header/Anchor";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Find buyer | EDC</title>
      </Head>
      <div className="wrapper">
        <h1 className={styles.headline}>Welcome to EDC Seller Helper</h1>
        <h3>
          With EDCs patentet Seller Helper<>&trade;</>, Well help to connect you
          with potential buyers in three simple steps!
        </h3>
      </div>
      <div className="wrapper front">
        <Anchor href="/estatedetails">
          <button className={styles.button}>Find buyers for your estate</button>
        </Anchor>
      </div>
      <div className="wrapper">
        <h4>
          <Anchor className="link--dashboard" href="/dashboard">
            EDC Broker? Press here to see dashboard.
          </Anchor>
        </h4>
      </div>
    </>
  );
}

// <div className="wrapper">
//   <h1 className={styles.headline}>Hello MMD</h1>
//   <div className={styles.content}>
//     <p>
//       To get started, edit <code>pages/index.js</code> and save to reload.
//     </p>
//   </div>
//   <div className={styles.content}>
//     <h2>Basic form example</h2>
//     <p>
//       This is simple example of how you could submit a form to another
//       page in Next.js, without using a custom <code>submit</code> function
//       (e.g. without JavaScript). It is unstyled and unfinished. You can
//       use this as base, or implement your own solution.
//     </p>
//     <p>
//       Make sure to read the guide on{" "}
//       <a
//         href="https://nextjs.org/docs/guides/building-forms"
//         target="_blank"
//       >
//         building forms in Next.js
//       </a>
//     </p>
//     <form action="/buyers" method="GET" className={styles.form}>
//       <label>
//         <span className={styles.label}>Zip Code</span>
//         <input name="zipCode" required />
//       </label>
//       <button className={styles.button}>Submit</button>
//     </form>
//   </div>
// </div>;
