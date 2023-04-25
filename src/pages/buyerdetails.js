import Head from "next/head";
import Anchor from "@/components/Header/Anchor";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Avatar, Card, Skeleton, Switch } from "antd";
import styles from "./Home.module.css";
import PotentialBuyer from "@/components/PotentialBuyer";
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
      <VisualSteps step={1} />
      <div className="wrapper">
        <h1 className={styles.headline}>2. Buyer Details</h1>
        <div className={styles.content}>
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
