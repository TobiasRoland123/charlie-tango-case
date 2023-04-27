import { Avatar, Card, Skeleton, Switch } from "antd";

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
          <strong>Contact info:</strong>
          <a href={`mailto:${seller.email}`}>{`Email: ${seller.email}`}</a>
          <a href={`tel:${seller.phone}`}>{seller.phone}</a>
          <p>{`Creation date: ${setDate(seller.created_at)}`}</p>
          <strong>About the property:</strong>
          <p>{`Property price: ${seller.price} DKK`}</p>
          <p>{`Property Size: ${seller.size} m2`}</p>
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
