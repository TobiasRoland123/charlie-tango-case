import { Avatar, Card, Skeleton, Switch } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import styles from "../pages/Home.module.css";
import { Button, Space, Modal } from "antd";
import { useState, useEffect } from "react";
import Anchor from "./Header/Anchor";

export default function SellerCard(props) {
  const [chosen, setChosen] = useState(0);
  const seller = props.seller;

  //Modal state variables
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    `You are about to delete case: ${seller.seller_id}`
  );
  const showModal = () => {
    setOpen(true);
  };

  // Function to set up modal
  const handleOk = () => {
    setModalText(`Deletes case: ${seller.seller_id}`);
    setConfirmLoading(true);
    setTimeout(() => {
      props.deleteEntry(props.deleteKey);
      props.setDeleteRun((old) => old + 1);
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    props.setDeleteRun((old) => old + 1);
  };

  //Handels cancel on modal
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

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
          <Button onClick={showModal}>Delete Case</Button>

          <Modal
            title="Do you want to delete this case?"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
          </Modal>
        </Card>
      </article>
    </>
  );
}

function setDate(dateString) {
  // console.log(dateString.substring(0, dateString.indexOf("T")));
  return dateString.substring(0, dateString.indexOf("T"));
}
