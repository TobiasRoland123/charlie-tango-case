// 1) Make a small desciption for the EDC broker
// 2) Import the sellers from supabase -- api route from at api/buyerProfiles.js?
import Head from "next/head";
import Anchor from "@/components/Header/Anchor";
import styles from "@/pages/Home.module.css";
import { useState, useEffect } from "react";
import SellerCard from "@/components/SellerCard";
import { Avatar, Card, Skeleton, Switch } from "antd";

export default function Dashboard() {
  const [sellers, setSellers] = useState("");
  const [deleteRun, setDeleteRun] = useState(0);

  //GDPR DELETE
  // Data from superbase returns like this:
  // "2023-04-28T11:24:36.691055+00:00"
  // So we'll need to match the date format with "YYYY-MM-DD" and have date and month be two numbers (01 insted of 1)

  //Find todays date
  const todayDate = getTodayDate();
  console.log(todayDate);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear() - 2;
    // console.log("Year:", year);
    const month = String(today.getMonth() + 1).padStart(2, "0");
    // console.log("Month:", month);
    const day = String(today.getDate()).padStart(2, "0");
    // console.log("Day:", day);
    const todayDate = year + "-" + month + "-" + day;
    return todayDate;
  }

  //Delete those that matches dates

  //GDPR DELETE

  useEffect(() => {
    fetch("/api/supabase-to-broker", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //Check every sellers created_at date, if match --> Run function that deletes the entry
        {
          data.response.map((seller) => {
            let sd = seller.created_at.substring(
              0,
              seller.created_at.indexOf("T")
            );
            if (sd === todayDate) {
              deleteEntry(seller);
              // console.log(seller.id);
              setDeleteRun((old) => old + 1);
            }
          });
        }

        const sortedData = [...data.response].sort((a, b) =>
          a.created_at > b.created_at ? -1 : 1
        );

        setSellers(sortedData);
      });
  }, [deleteRun]);

  function deleteEntry(seller) {
    console.log(`deleteEntry called with id: ${seller.id}`);
    console.log(`DeleteRun:`, deleteRun);
    fetch("/api/delete-seller-case", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify(seller.id),
    })
      .then((res) => res.json())
      .then((data) => setDeleteRun((old) => old + 1));

    // fetch(
    //   `https://pidnszjfygdazvvfuozh.supabase.co/rest/v1/edc_seller_helper?id=eq.${id}`,
    //   {
    //     method: "delete",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Prefer: "return=representation",
    //       apikey: process.env.SUPABASE_KEY,
    //     },
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  }

  // function sellerPatch(payload) {
  //   const updates = payload;

  //   console.log(`SellerPatch called with id: ${payload}`);
  //   fetch("/api/patch-seller-case", {
  //     method: "PATCH",
  //     headers: {
  //       "content-type": "application/json",
  //     },

  //     body: JSON.stringify(updates),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }

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
        <div className={`${styles.content}`}>
          <h2>Choose a seller</h2>

          <ul className={` ${styles.buyerCards}`}>
            {sellers.length === 0 ? (
              <Card style={{ width: 300, marginTop: 16 }}></Card>
            ) : (
              sellers.map((seller) => (
                <SellerCard
                  key={seller.id}
                  seller={seller}
                  deleteEntry={deleteEntry}
                  deleteKey={seller}
                  setDeleteRun={setDeleteRun}
                  sellers={sellers}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
