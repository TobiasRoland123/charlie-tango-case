import Head from "next/head";
import Anchor from "@/components/Header/Anchor";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Skeleton } from "antd";
import VisualSteps from "./components/VisualSteps";

export default function EstateDetails(buyers) {
  const { query } = useRouter();
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);

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

  console.log(query.price);

  console.log(data);
  return (
    <>
      <Head>
        <title>Buyer Details | EDC</title>
      </Head>
      <VisualSteps current="1" />
      <div className="wrapper">
        <h1 className={styles.headline}>2. Buyer Details</h1>
        <div className={styles.content}>
          {data.length === 0 ? (
            <Skeleton active />
          ) : (
            data.map((buyer) => <p key={buyer.id}>{buyer.maxPrice}</p>)
          )}
        </div>
      </div>
    </>
  );
}
