import Head from "next/head";
import Anchor from "@/components/Header/Anchor";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Avatar, Card, Skeleton, Switch, Badge } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { SellerInformation } from "./_app";
import { estateTypes } from "@/data/estateTypes";
import styles from "./Home.module.css";
import PotentialBuyer from "@/components/PotentialBuyer";
import VisualSteps from "../components/VisualSteps";

export default function BuyerDetails(buyers) {
  const { query } = useRouter();
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [zipL, setZipL] = useState();
  const [sellerDetails, setSellerDetails] = useContext(SellerInformation);
  const price = sellerDetails.price;
  const zip = sellerDetails.zip;

  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    //if !useContext.buyers ? "Fetch" : setData(useContext.buyers)
    fetch(
      `/api/find-buyers?price=${query.price}&size=${query.size}&zipCode=${query.zipCode}&estateType=${query.estateType}`
    )
      .then((res) => res.json())
      .then((data) => {
        {
          data.map((data) => {
            (data.chosen = false), (data.contacted = false);
          });
        }
        // console.log("afterMap", data);
        setData(data);
        // setData(data);
        setLoading(false);
      });
  }, [query]);

  const estateChecker = (e) => {
    for (let i = 0; i < estateTypes.length; i++) {
      if (e === estateTypes[i].id) {
        return estateTypes[i].name;
      }
    }
  };

  useEffect(() => {
    fetch(`https://api.dataforsyningen.dk/postnumre/${zip}`)
      .then((res) => res.json())
      .then((data) => {
        setZipL(data.navn);
      });
  }, [zip]);

  // console.log(zipL);

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
      <h1 className={styles.headline}>2. Buyer Details</h1>
      <VisualSteps step={1} />
      <div className="wrapper">
        <h3 className={styles.headline_explainer}>
          We found potential buyers, who is looking for estates matching yours!{" "}
          {"\n"} Click on the buyers that you want us to contact on your behalf.
        </h3>
        <div className={styles.grid_1_2}>
          {zipL === "" ? (
            <Card style={{ width: 300, marginTop: 16 }}></Card>
          ) : (
            <div className={styles.content}>
              <h2>Estate Details:</h2>
              <p className="estateDetails_p">
                {price !== undefined ? (
                  <span>
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} DKK
                  </span>
                ) : (
                  ""
                )}
              </p>
              <p className="estateDetails_p">
                <span>{sellerDetails.size} &#13217;</span>
              </p>
              <p className="estateDetails_p">
                <span>{sellerDetails.full_address}</span>
              </p>
              <p className="estateDetails_p">
                <span>{estateChecker(sellerDetails.estateType)}</span>
              </p>
            </div>
          )}
          <div className={`${styles.content} ${styles.relative_container}`}>
            <h2>Chosen buyers</h2>
            <div className="chosen_container">
              <ul>
                {data.map((buyer) =>
                  buyer.chosen ? (
                    <li key={buyer.id}>
                      <span className="id_area">Buyer ID: {buyer.id}</span>

                      <span className="budget_area">
                        (
                        {buyer.maxPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        ,- DKK)
                      </span>
                      <DeleteOutlined onClick={() => updateBuyers(buyer.id)} />
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
              <button
                className={`${styles.button} ${styles.next_button}`}
                onClick={() => updateSellerInformation()}
              >
                Choose buyers and go to next page
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
