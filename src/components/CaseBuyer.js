import { useState } from "react";
import { Card, Switch } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import styles from "../pages/Home.module.css";
import { check } from "prettier";
import { Button, Space, Modal } from "antd";

export default function PotentialBuyer(props) {
  // console.table(props.buyer);
  const [buyer, setBuyer] = useState(props.buyer);
  const [sellerCase, setSellerCase] = useState(props.sellerCase);
  const [contacted, setContacted] = useState(buyer.contacted);

  const handleClick = (e) => console.log(e);

  function contactedOnChange() {
    buyer.contacted ? (buyer.contacted = false) : (buyer.contacted = true);
    // console.log("buyer.contacted is now:", buyer.contacted);

    logger();

    sellerPatch({ sellerCase, id: props.sellerCase.id });
  }

  function logger() {
    setContacted(buyer.contacted);
    console.log("sellerState:", contacted);
  }

  function sellerPatch(payload) {
    const updates = payload;

    console.log(`SellerPatch called with id: ${payload.id}`);
    fetch("/api/patch-seller-case", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify(updates),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <>
      <article
        className={
          !props.buyer.chosen ? "buyer_card" : "buyer_card buyer_card_chosen"
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
          {props.buyer.chosen === true ? (
            <p className="chosen_explainer">
              <small>
                <i>Chosen by seller</i>
              </small>
            </p>
          ) : (
            ""
          )}
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

          {/* <Button
            onClick={() => {
              props.sellerPatch({ name: "Anders", id: props.sellerCase.id });
            }}
          >
            buyer PATCH
          </Button> */}

          <Switch
            checked={contacted ? true : false}
            onChange={contactedOnChange}
          />
        </Card>
      </article>
    </>
  );
}
