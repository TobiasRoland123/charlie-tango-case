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

  function contactedOnChange() {
    buyer.contacted ? (buyer.contacted = false) : (buyer.contacted = true);
    // console.log("buyer.contacted is now:", buyer.contacted);

    logger();

    sellerPatch({ ...sellerCase, id: props.sellerCase.id });
  }

  function logger() {
    setContacted(buyer.contacted);
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

          <div className="familyMembers">
            {buyer.adults === 1 ? (
              <span className="familyMemberBlock">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 96 960 960"
                  width="24"
                >
                  <path d="M480 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160 896v-94q0-38 19-65t49-41q67-30 128.5-45T480 636q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800 764 800 802v94H160Zm60-60h520v-34q0-16-9.5-30.5T707 750q-64-31-117-42.5T480 696q-57 0-111 11.5T252 750q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570 425q0-39-25.5-64.5T480 335q-39 0-64.5 25.5T390 425q0 39 25.5 64.5T480 515Zm0-90Zm0 411Z" />
                </svg>

                <p>{buyer.adults} Adult</p>
              </span>
            ) : (
              <span className="familyMemberBlock">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 96 960 960"
                  width="24"
                >
                  <path d="M38 896v-94q0-35 18-63.5t50-42.5q73-32 131.5-46T358 636q62 0 120 14t131 46q32 14 50.5 42.5T678 802v94H38Zm700 0v-94q0-63-32-103.5T622 633q69 8 130 23.5t99 35.5q33 19 52 47t19 63v94H738ZM358 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42Zm360-150q0 66-42 108t-108 42q-11 0-24.5-1.5T519 568q24-25 36.5-61.5T568 425q0-45-12.5-79.5T519 282q11-3 24.5-5t24.5-2q66 0 108 42t42 108ZM98 836h520v-34q0-16-9.5-31T585 750q-72-32-121-43t-106-11q-57 0-106.5 11T130 750q-14 6-23 21t-9 31v34Zm260-321q39 0 64.5-25.5T448 425q0-39-25.5-64.5T358 335q-39 0-64.5 25.5T268 425q0 39 25.5 64.5T358 515Zm0 321Zm0-411Z" />
                </svg>

                <p> {buyer.adults} Adults</p>
              </span>
            )}

            {props.buyer.children !== 0 ? (
              <>
                {props.buyer.children === 1 ? (
                  <span className="familyMemberBlock">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 96 960 960"
                      width="24"
                    >
                      <path d="M360 666q-21 0-35.5-14.5T310 616q0-21 14.5-35.5T360 566q21 0 35.5 14.5T410 616q0 21-14.5 35.5T360 666Zm240 0q-21 0-35.5-14.5T550 616q0-21 14.5-35.5T600 566q21 0 35.5 14.5T650 616q0 21-14.5 35.5T600 666ZM480 896q134 0 227-93t93-227q0-24-3-46.5T786 486q-21 5-42 7.5t-44 2.5q-91 0-172-39T390 348q-32 78-91.5 135.5T160 570v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 83-31.5 156T763 859q-54 54-127 85.5T480 976Zm-54-715q42 70 114 112.5T700 416q14 0 27-1.5t27-3.5q-42-70-114-112.5T480 256q-14 0-27 1.5t-27 3.5ZM177 475q51-29 89-75t57-103q-51 29-89 75t-57 103Zm249-214Zm-103 36Z" />
                    </svg>

                    <p>{props.buyer.children} Child</p>
                  </span>
                ) : (
                  <span className="familyMemberBlock">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 96 960 960"
                      width="24"
                    >
                      <path d="M360 666q-21 0-35.5-14.5T310 616q0-21 14.5-35.5T360 566q21 0 35.5 14.5T410 616q0 21-14.5 35.5T360 666Zm240 0q-21 0-35.5-14.5T550 616q0-21 14.5-35.5T600 566q21 0 35.5 14.5T650 616q0 21-14.5 35.5T600 666ZM480 896q134 0 227-93t93-227q0-24-3-46.5T786 486q-21 5-42 7.5t-44 2.5q-91 0-172-39T390 348q-32 78-91.5 135.5T160 570v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 83-31.5 156T763 859q-54 54-127 85.5T480 976Zm-54-715q42 70 114 112.5T700 416q14 0 27-1.5t27-3.5q-42-70-114-112.5T480 256q-14 0-27 1.5t-27 3.5ZM177 475q51-29 89-75t57-103q-51 29-89 75t-57 103Zm249-214Zm-103 36Z" />
                    </svg>

                    <p>{props.buyer.children} Children</p>
                  </span>
                )}
              </>
            ) : (
              <p></p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "4rem 0 1rem",
            }}
          >
            <p className="chosen_explainer_left">
              <small>ID:{props.buyer.id}</small>
            </p>

            <Switch
              checked={contacted ? true : false}
              onChange={contactedOnChange}
            />
          </div>
        </Card>
      </article>
    </>
  );
}
