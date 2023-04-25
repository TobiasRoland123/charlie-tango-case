import Head from "next/head";
import Anchor from "@/components/Header/Anchor";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Avatar, Card, Skeleton, Switch } from "antd";
import { SellerInformation } from "./_app";
import styles from "./Home.module.css";
import PotentialBuyer from "@/components/PotentialBuyer";
import VisualSteps from "../components/VisualSteps";

export default function BuyerDetails(buyers) {
  const { query } = useRouter();
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [sellerDetails, setSellerDetails] = useContext(SellerInformation);
  const buyerInfo = data;

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/find-buyers?price=${query.price}&size=${query.size}&zipCode=${query.zipCode}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [query]);

  // console.log(query.price);
  // console.log(data);
  // console.log("Seller Details", sellerDetails);

  return (
    <>
      <Head>
        <title>Buyer Details | EDC</title>
      </Head>
      <VisualSteps step={1} />
      <div className="wrapper">
        <h1 className={styles.headline}>2. Buyer Details</h1>
        <div>
          <div className={styles.content}>
            <h2>Estate Details:</h2>
            <p>Price: {sellerDetails.price}</p>
            <p>Size: {sellerDetails.size}</p>
            <p>Zip Code: {sellerDetails.zip}</p>
          </div>
          <div className={styles.content}>
            <h2>Chosen buyers</h2>
            {data.map((buyer) =>
              buyer.chosen ? <p key={buyer.id}>{buyer.id}</p> : ""
            )}
          </div>
        </div>
        <div className={`${styles.content} ${styles.buyerCards}`}>
          {data.length === 0 ? (
            <Card style={{ width: 300, marginTop: 16 }}></Card>
          ) : (
            data.map((buyer) => <PotentialBuyer buyer={buyer} key={buyer.id} />)
          )}
        </div>
      </div>
    </>
  );
}
