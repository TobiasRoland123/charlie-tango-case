import Head from "next/head";
import Anchor from "@/components/Header/Anchor";
import styles from "./Home.module.css";

export default function EstateDetails() {
  return (
    <>
      <Head>
        <title>Buyer Details | EDC</title>
      </Head>
      <div className="wrapper">
        <h1 className={styles.headline}>2. Buyer Details</h1>
        <div className={styles.content}></div>
      </div>
    </>
  );
}
