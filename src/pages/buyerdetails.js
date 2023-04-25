import Head from "next/head";
import Anchor from "@/components/Header/Anchor";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";

export default function EstateDetails(buyers) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/find-buyers")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  console.log(data);
  return (
    <>
      <Head>
        <title>Buyer Details | EDC</title>
      </Head>
      <div className="wrapper">
        <h1 className={styles.headline}>2. Buyer Details</h1>
        <div className={styles.content}>
          {data.length === 0 ? (
            <p>LOADING.......</p>
          ) : (
            data.map((buyer) => <p key={buyer.id}>{buyer.maxPrice}</p>)
          )}
        </div>
      </div>
    </>
  );
}
