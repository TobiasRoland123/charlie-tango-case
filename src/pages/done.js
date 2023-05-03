import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./Home.module.css";
import { useState, useEffect, useContext } from "react";
import { SellerInformation } from "./_app";
import Image from "next/image";
import VisualSteps from "@/components/VisualSteps";

export default function Done() {
  const [sellerDetails, setSellerDetails] = useContext(SellerInformation);

  function sendToSupabase() {
    // console.log(`send to supabase activatet`);
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
      <h1 className={styles.headline}>Done!</h1>
      <VisualSteps step={4} />
      <div className="wrapper">
        <h2
          className={`${styles.headline_end_explainer} ${styles.headline_end_explainer1}`}
        >
          Thanks for using EDC&lsquo;s Seller Helper&trade;!
        </h2>
        <h2 className={styles.headline_end_explainer}>
          We&lsquo;ll contact you within 48 hours
        </h2>
        <Image
          className={styles.estateDetails_end_image}
          src="https://images.pexels.com/photos/4148992/pexels-photo-4148992.jpeg"
          alt="Couple standing together, holding eachother"
          placeholder="blurDataUrl"
          width="5760"
          height="3840"
        />
      </div>
    </>
  );
}
