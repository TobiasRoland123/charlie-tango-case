import { useState } from "react";
import { Card } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import styles from "../pages/Home.module.css";
import { check } from "prettier";

export default function PotentialBuyer(props) {
  // console.table(props.buyer);
  const [buyer, setBuyer] = useState(props.buyer);

  console.log("buyer", buyer);

  // Jeg ka' sku ikke rigtig få det til at spille.
  function checkChosen() {
    setBuyer((buyer) => ({
      ...buyer,
      chosen: true,
    }));
    console.log(buyer);
  }

  return (
    <>
      <article className="buyer_card">
        <Card
          title={`Budget: ${props.buyer.maxPrice} DKK`}
          bordered={false}
          style={{
            width: 300,
          }}
        >
          <strong>About the buyer:</strong>
          <p>{props.buyer.description}</p>
          {props.buyer.children === 0 ? (
            <p>Adults: {props.buyer.adults}</p>
          ) : (
            <>
              <p>Adults: {props.buyer.adults}</p>
              <p>Children: {props.buyer.children}</p>
            </>
          )}

          <button className={styles.button}>Add buyer to list</button>
          {!props.buyer.chosen ? (
            <CloseCircleOutlined className={styles.cardSelector} />
          ) : (
            <CheckCircleOutlined className={styles.cardSelector} />
          )}
        </Card>
      </article>
    </>
  );
}
