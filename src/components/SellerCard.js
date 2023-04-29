import { Avatar, Card, Skeleton, Switch } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import styles from "../pages/Home.module.css";
import { Button, Space } from "antd";
import { useState, useEffect } from "react";
import Anchor from "./Header/Anchor";

export default function SellerCard(props) {
  const [chosen, setChosen] = useState(0);
  const seller = props.seller;

  useEffect(() => {
    for (let i = 0; i < seller.buyers.length; i++) {
      if (seller.buyers[i].chosen === true) {
        setChosen((prev) => prev + 1);
      }
    }
  }, [seller]);

  return (
    <>
      <article className="dashboard_sellerCards">
        <Card
          title={seller.name}
          bordered={false}
          style={{
            width: 300,
          }}
        >
          {seller.buyers === null ? (
            <h3>No buyers</h3>
          ) : (
            <h3>
              {" "}
              {`Chosen buyers: ${chosen} ( of ${seller.buyers.length} possible)`}
            </h3>
          )}
          <p>{`Creation date: ${setDate(seller.created_at)}`}</p>
          <strong>Contact info:</strong>

          <p>
            <a href={`mailto:${seller.email}`}>{`${seller.email}`}</a>
          </p>

          <p>
            <a href={`tel:${seller.phone}`}>{seller.phone}</a>
          </p>

          <strong>About the property:</strong>
          <p>{`${seller.price} DKK`}</p>
          <p>{`${seller.size} m2`}</p>
          <p>{`Zip Code: ${seller.zip}`}</p>

          <Anchor
            href={`/dashboard/seller-case/${seller.id}`}
            className="dashboard_anchor"
          >
            <Button type="primary" size={"small"}>
              Open case
            </Button>
          </Anchor>

          <Button
            onClick={() => {
              props.deleteEntry(props.deleteKey);
              props.setDeleteRun((old) => old + 1);
            }}
          >
            Delete Case
          </Button>
        </Card>
      </article>
    </>
  );
}

function setDate(dateString) {
  // console.log(dateString.substring(0, dateString.indexOf("T")));
  return dateString.substring(0, dateString.indexOf("T"));
}

function deleteSeller() {}

/*
buyers: null
​​
consent: true
​​
created_at: "2023-04-27T12:07:14.48492+00:00"
​​
email: "sasd@ee"
​​
estateType: "5"
​​
id: 7
​​
name: "sdf sdf"
​​
phone: "50478603"
​​
price: 123
​​
size: 123
​​
zip: 2605 */
