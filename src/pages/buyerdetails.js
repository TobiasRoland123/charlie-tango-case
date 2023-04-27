import Head from "next/head";
import Anchor from "@/components/Header/Anchor";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Avatar, Card, Skeleton, Switch } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { SellerInformation } from "./_app";
import styles from "./Home.module.css";
import PotentialBuyer from "@/components/PotentialBuyer";
import VisualSteps from "../components/VisualSteps";

export default function BuyerDetails(buyers) {
  const { query } = useRouter();
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [sellerDetails, setSellerDetails] = useContext(SellerInformation);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    //if !useContext.buyers ? "Fetch" : setData(useContext.buyers)
    fetch(
      `/api/find-buyers?price=${query.price}&size=${query.size}&zipCode=${query.zipCode}`
    )
      .then((res) => res.json())
      .then((data) => {
        {
          data.map((data) => (data.chosen = false));
        }
        // console.log("afterMap", data);
        setData(data);
        // setData(data);
        setLoading(false);
      });
  }, [query]);

  function updateBuyers(id) {
    // console.log(id);
    const updatedBuyers = data.map((buyer) => {
      // console.log(buyer);
      if (buyer.id === id && buyer.chosen === false) {
        const newBuyer = { ...buyer };
        newBuyer.chosen = true;
        return newBuyer;
        // buyer.chosen = true;
      } else if (buyer.id === id && buyer.chosen === true) {
        const newBuyer = { ...buyer };
        newBuyer.chosen = false;
        return newBuyer;
      }
      return buyer;
    });

    setData(updatedBuyers);
    // console.log(data);
  }

  function updateSellerInformation() {
    // console.log(data);
    const newSeller = { ...sellerDetails };
    newSeller.buyers = data;
    setSellerDetails(newSeller);
    // console.log(sellerDetails);
    router.push(`/sellercontactinfo`);
  }

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

            <Anchor href={"/sellercontactinfo"}>Submit</Anchor>
          </div>
          <div className={styles.content}>
            <h2>Chosen buyers</h2>
            <div className="chosen_container">
              <ul>
                {data.map((buyer) =>
                  buyer.chosen ? (
                    <li key={buyer.id}>
                      <span>ID: {buyer.id}</span>
                      <DeleteOutlined onClick={() => updateBuyers(buyer.id)} />
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
              <button onClick={() => updateSellerInformation()}>
                Sup bitches
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles.content} ${styles.buyerCards}`}>
          {data.length === 0 ? (
            <Card style={{ width: 300, marginTop: 16 }}></Card>
          ) : (
            data.map((buyer) => (
              <PotentialBuyer
                buyer={buyer}
                key={buyer.id}
                updateBuyers={updateBuyers}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
