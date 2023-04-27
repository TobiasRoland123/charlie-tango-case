import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./Home.module.css";
import { useState, useEffect, useContext } from "react";
import { SellerInformation } from "./_app";

export default function Done() {
  const [sellerDetails, setSellerDetails] = useContext(SellerInformation);

  function sendToSupabase() {
    console.log(`send to supabase activatet`);
    fetch("/api/seller-to-supabase", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(sellerDetails),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  sendToSupabase();

  // console.log(JSON.stringify(sellerDetails));

  return (
    <>
      <Head>
        <title>Thanks for choosing us</title>
      </Head>
      <div className="wrapper">
        <h1 className={styles.headline}>Done</h1>
        <p>Thanks for choosing us</p>
      </div>
    </>
  );
}
