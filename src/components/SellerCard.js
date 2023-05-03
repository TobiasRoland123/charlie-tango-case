import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import styles from "../pages/Home.module.css";
import { Button, Space, Modal, Switch, Card, ConfigProvider } from "antd";
import { useState, useEffect } from "react";
import Anchor from "./Header/Anchor";

export default function SellerCard(props) {
  const [chosen, setChosen] = useState(0);
  const seller = props.seller;

  const [contacted, setContacted] = useState(seller.contacted);

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
    // console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    for (let i = 0; i < seller.buyers.length; i++) {
      if (seller.buyers[i].chosen === true) {
        setChosen((prev) => prev + 1);
      }
    }
  }, [seller]);

  function contactedOnChange() {
    seller.contacted ? (seller.contacted = false) : (seller.contacted = true);
    // console.log("seller.contacted is now:", seller.contacted);
    logger();

    sellerPatch({ contacted: seller.contacted, id: seller.id });
  }

  function logger() {
    setContacted(seller.contacted);
    // console.log("sellerState:", contacted);
  }

  function sellerPatch(payload) {
    const updates = payload;

    // console.log(`SellerPatch called with id: ${payload.id}`);
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
          seller.contacted ? "buyer_card_contacted" : "dashboard_sellerCards"
        }
      >
        <Card
          title={seller.name}
          bordered={false}
          style={{
            width: 300,
          }}
        >
          <small>
            <i>{`Submission date: ${setDate(seller.created_at)}`}</i>
          </small>
          <h3>About the property:</h3>
          <p>{`${seller.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} DKK`}</p>
          <p>{`${seller.size} m2`}</p>
          <p>{`${seller.full_address}`}</p>
          <h4>Contact info:</h4>
          <p>
            <a
              className="dashboard_atag"
              href={`mailto:${seller.email}`}
            >{`${seller.email}`}</a>
          </p>
          <p>
            <a className="dashboard_atag" href={`tel:${seller.phone}`}>
              {seller.phone}
            </a>
          </p>
          {seller.buyers === null ? (
            <h3>No buyers</h3>
          ) : (
            <strong>
              {" "}
              {`Chosen buyers: ${chosen} ( of ${seller.buyers.length} possible)`}
            </strong>
          )}
          <div className="contacted_seller_option">
            {seller.contacted === false ? (
              <div>
                <p>{seller.name} has not been contacted.</p>
                <small>
                  <i>Check box when contacted</i>
                </small>
              </div>
            ) : (
              <p>{seller.name} has been contacted.</p>
            )}
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#fec315",
                },
              }}
            >
              <Switch
                checked={contacted ? true : false}
                onChange={contactedOnChange}
              />
            </ConfigProvider>
          </div>
          <div className="test_box">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimaryHover: "#f24040",
                },
              }}
            >
              <Button onClick={showModal} size="middle">
                Delete Case
              </Button>
            </ConfigProvider>
          </div>
          <Modal
            title="Do you want to delete this case?"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
          </Modal>
          <Anchor
            href={`/dashboard/seller-case/${seller.id}`}
            className="dashboard_anchor"
          >
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#fec315",
                  colorText: "#000",
                },
              }}
            >
              <Button type="primary" size={"small"}>
                See buyers
              </Button>
            </ConfigProvider>
          </Anchor>
        </Card>
      </article>
    </>
  );
}

function setDate(dateString) {
  // console.log(dateString.substring(0, dateString.indexOf("T")));
  return dateString.substring(0, dateString.indexOf("T"));
}
