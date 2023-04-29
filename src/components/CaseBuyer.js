import { useState } from "react";
import { Card } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import styles from "../pages/Home.module.css";
import { check } from "prettier";

export default function PotentialBuyer(props) {
  // console.table(props.buyer);
  const [buyer, setBuyer] = useState(props.buyer);

  const handleClick = (e) => console.log(e);
  // e.buyer === true ? setBuyer((e.buyer = false)) : setBuyer((e.buyer = true)));

  // console.log("buyer", buyer);

  return (
    <>
      <article
        className={
          !props.buyer.contacted ? "buyer_card" : "buyer_card buyer_card_chosen"
        }
        // onClick={() => {
        //   props.updateBuyers(props.buyer.id);
        // }}
      >
        <Card
          title={`Budget: ${props.buyer.maxPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} DKK`}
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
          <small>ID:{props.buyer.id}</small>
        </Card>
      </article>
    </>
  );
}
