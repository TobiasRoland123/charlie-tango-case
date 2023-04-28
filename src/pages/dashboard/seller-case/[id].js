// pages/posts/[id].js

import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/pages/Home.module.css";

export default function Post({ data }) {
  const router = useRouter();
  const sellerCase = data.response[0];

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Seller case | {sellerCase.id} </title>
      </Head>

      <div className="wrapper">
        <h1 className={styles.headline}>{sellerCase.name} </h1>
        <div className={styles.content}></div>
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
