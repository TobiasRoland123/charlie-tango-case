// pages/posts/[id].js

import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/pages/Home.module.css";
import { Card, Radio } from "antd";
import { useState, useEffect } from "react";
import { estateTypes } from "@/data/estateTypes";
import { stringify } from "querystring";
import CaseBuyer from "@/components/CaseBuyer";

export default function Post({ data }) {
  const router = useRouter();

  const [sellerCase, setSellerCase] = useState(data.response[0]);
  // const sellerCase = data.response[0];
  const [zipL, setZipL] = useState();

  useEffect(() => {
    fetch(`https://api.dataforsyningen.dk/postnumre/${sellerCase.zip}`)
      .then((res) => res.json())
      .then((data) => {
        setZipL(data.navn);
      });
  }, [sellerCase.zip]);

  const estateChecker = (e) => {
    for (let i = 0; i < estateTypes.length; i++) {
      if (e === estateTypes[i].id) {
        return estateTypes[i].name;
      }
    }
  };

  function updateBuyers(id) {
    // console.log(id);
    const updatedBuyers = sellerCase.buyers.map((buyer) => {
      // console.log(buyer);
      if (buyer.id === id && buyer.contacted === false) {
        const newBuyer = { ...buyer };
        newBuyer.contacted = true;
        return newBuyer;
        // buyer.chosen = true;
      } else if (buyer.id === id && buyer.contacted === true) {
        const newBuyer = { ...buyer };
        newBuyer.contacted = false;
        return newBuyer;
      }
      return buyer;
    });
    setSellerCase((sellerCase.buyers = updatedBuyers));
    // console.log(data);
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  console.log(stringify(sellerCase.price));

  return (
    <div>
      <Head>
        <title>Seller case | {sellerCase.id} </title>
      </Head>

      <div className="wrapper">
        <h1 className={styles.headline}>{sellerCase.name} </h1>
        <div className={styles.content}>
          <div className={styles.grid_1_2}>
            {zipL === "" ? (
              <Card style={{ width: 300, marginTop: 16 }}></Card>
            ) : (
              <div className={styles.content}>
                <h2>Estate Details:</h2>
                <p className="estateDetails_p">
                  <span>
                    {sellerCase.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    DKK
                  </span>
                </p>
                <p className="estateDetails_p">
                  <span>{sellerCase.size} &#13217;</span>
                </p>
                <p className="estateDetails_p">
                  <span>{sellerCase.full_address}</span>
                </p>
                <p className="estateDetails_p">
                  <span>{estateChecker(sellerCase.estateType)}</span>
                </p>
              </div>
            )}
            <div className={`${styles.content} ${styles.relative_container}`}>
              <h2>Chosen buyers</h2>
              <div className="dashboard_chosen_container">
                <ul>
                  {sellerCase.buyers.map((buyer) =>
                    buyer.chosen ? (
                      <li key={buyer.id}>
                        <span>Buyer ID: {buyer.id}</span>
                        <span>
                          (
                          {buyer.maxPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          ,- DKK)
                        </span>
                      </li>
                    ) : (
                      ""
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard_filter_buttons">
          <Radio.Group defaultValue="*" buttonStyle="solid">
            <Radio.Button value="*">All buyers</Radio.Button>
            <Radio.Button value="chosen">Buyers chosen by seller</Radio.Button>
            <Radio.Button value="notChosen">
              Buyers not chosen by seller
            </Radio.Button>
          </Radio.Group>
        </div>
        <div>
          <div className={`${styles.content} ${styles.buyerCards}`}>
            {sellerCase.buyers.length === 0 ? (
              <Card style={{ width: 300, marginTop: 16 }}></Card>
            ) : (
              sellerCase.buyers.map((buyer) => (
                <CaseBuyer
                  buyer={buyer}
                  key={buyer.id}
                  updateBuyers={updateBuyers}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;

  // Fetch post data from API using the ID parameter
  const res = await fetch(
    `http://localhost:3000/api/supabase-to-broker-single?id=${id}`
  );
  const data = await res.json();

  // Pass the post data as props to the page
  return {
    props: {
      data,
    },
  };
}

/**
{
      "id": 19,
      "created_at": "2023-04-27T13:05:57.015178+00:00",
      "estateType": "6",
      "price": 3000000,
      "size": 4000,
      "zip": 2605,
      "name": "Samuel Tobias Roland Uyet",
      "email": "samueltobiasrolanduyet@gmail.com",
      "phone": "50478603",
      "buyers": [
        {
          "id": "91259c07",
          "maxPrice": 3000000,
          "minSize": 4141,
          "adults": 1,
          "children": 5,
          "description": "Single parent is looking for a Ejerlejlighed with a minimum size of 4141 m2 and a maximum price of 3.000.000 kr. Saepe magnam possimus.",
          "estateType": "4",
          "takeoverDate": "2023-07-25",
          "chosen": true
        }, 
 
 */
