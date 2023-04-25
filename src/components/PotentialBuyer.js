import { Card } from "antd";

export default function PotentialBuyer(props) {
  // console.table(props.buyer);

  return (
    <>
      <article className="buyer_card">
        <Card
          title={`Max price: ${props.buyer.maxPrice} DKK`}
          bordered={false}
          style={{
            width: 300,
          }}
        >
          <small>Description</small>
          <p>{props.buyer.description}</p>

          <p>{`${props.buyer.adults} Adults, and ${props.buyer.children} Children`}</p>

          <p></p>
        </Card>
      </article>
    </>
  );
}
