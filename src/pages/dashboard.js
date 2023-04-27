// 1) Make a small desciption for the EDC broker
// 2) Import the sellers from supabase -- api route from at api/buyerProfiles.js?
import Head from "next/head";
import Anchor from "@/components/Header/Anchor";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [sellers, setSellers] = useState("");

  useEffect(() => {
    fetch("/api/supabase-to-broker", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setSellers(data.response));
  }, []);
  console.log(`Sellers: `, sellers);
  return (
    <>
      <Head>
        <title>Dashboard Overview | EDC</title>
      </Head>
      <div className="wrapper">
        <h1 className={styles.headline}>EDC broker dashboard</h1>
        <div className={styles.content}>
          <p>
            Welcome to the EDC Seller Helper&trade; dashboard. See all out
            estate sellers below. Delete sellers or click on them to see more
            about them and their chosen buyers.
          </p>
        </div>
        <div className={styles.content}>
          <h2>Choose a seller</h2>

          {sellers.map((seller) => (
            <li key={seller.id}>
              <p>{seller.name}</p>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}
