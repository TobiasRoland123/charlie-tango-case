import { Avatar, Card, Skeleton, Switch } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import styles from "../pages/Home.module.css";
import { Button, Space } from "antd";
import Anchor from "./Header/Anchor";

export default function SellerCard(props) {
  const seller = props.seller;

  return (
    <>
      <article>
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
            <h3> {`Potential buyers: ${seller.buyers.length}`}</h3>
          )}
          <strong>Contact info:</strong>

          <p>
            <a href={`mailto:${seller.email}`}>{`Email: ${seller.email}`}</a>
          </p>

          <p>
            <a href={`tel:${seller.phone}`}>{seller.phone}</a>
          </p>
          <p>{`Creation date: ${setDate(seller.created_at)}`}</p>
          <strong>About the property:</strong>
          <p>{`Property price: ${seller.price} DKK`}</p>
          <p>{`Property Size: ${seller.size} m2`}</p>
          <p>{`Zip Code: ${seller.zip}`}</p>

          <Button type="primary" size="small" className={styles.cardSelector}>
            Open case
          </Button>

          <Anchor href={`/dashboard/seller-case/${seller.id}`}>
            Open case
          </Anchor>
        </Card>
      </article>
    </>
  );
}

function setDate(dateString) {
  console.log(dateString.substring(0, dateString.indexOf("T")));
  return dateString.substring(0, dateString.indexOf("T"));
}

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
