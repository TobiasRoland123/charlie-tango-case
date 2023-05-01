import Head from "next/head";
import Anchor from "@/components/Header/Anchor";
import styles from "./Home.module.css";
import Image from "next/image";
import { estateTypes } from "@/data/estateTypes";
import { InputNumber, Select, Button, Modal } from "antd";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import VisualSteps from "../components/VisualSteps";
import { SellerInformation } from "./_app";
import ZipSelctor from "../components/ZipSelctor";

export default function EstateDetails() {
  //States
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [zip, setZip] = useState("");
  const [zipValidator, setZipValidator] = useState("");
  const [estateType, setEstateType] = useState("");
  const [sellerDetails, setSellerDetails] = useContext(SellerInformation);
  const [fullAdress, setFullAdress] = useState();
  const [adress, setAdress] = useState();
  const [dataF, setDataF] = useState();
  const [storedSearch, setStoredSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  let estateDetails;

  function showModal() {
    setIsModalOpen(true);
  }

  const handleOk = () => {
    setAdress("");
    setIsModalOpen(false);
  };

  const newEstates = [
    estateTypes.map((est) => ({
      value: est.id,
      label: est.name,
    })),
  ];
  const router = useRouter();

  const adressChanged = (e) => {
    setAdress(e.replace(/ /g, "%20").replace(/,/g, ""));
  };

  // UseEffect for the ZipCode validator
  useEffect(() => {
    fetch(`https://api.dataforsyningen.dk/postnumre/${zip}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setZipValidator(data);
      });
  }, [zip]);

  useEffect(() => {
    //Price check
    if (sellerDetails.price === "") {
      setPrice();
    } else {
      setPrice(sellerDetails.price);
    }
    if (sellerDetails.size === "") {
      setSize();
    } else {
      setSize(sellerDetails.size);
    }
    if (sellerDetails.zip === "") {
      setZip();
    } else {
      setZip(sellerDetails.zip);
    }
    if (sellerDetails.estateType === "") {
      setEstateType();
    } else {
      setEstateType(sellerDetails.estateType);
    }
  }, [sellerDetails]);

  useEffect(() => {
    // console.log(adress);
    fetch(
      `https://api.dataforsyningen.dk/autocomplete?q=${adress}&caretpos=18&fuzzy=`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data.tekst);
        const nyeForslag = data.map((adr) => ({
          value: adr.forslagstekst.toLowerCase(),
          label: adr.forslagstekst,
        }));
        // console.log(nyeForslag);
        setDataF(nyeForslag);
      });
  }, [adress]);

  const priceChanged = (e) => {
    setPrice(e);
  };
  const sizeChanged = (e) => {
    setSize(e);
  };

  function zipChanged(e) {
    // console.log("e.target", e);
    const splitAddress1 = e.split(" ");
    // Extract zip from the array
    const cutZip = splitAddress1[splitAddress1.length - 2];
    setZip(cutZip);

    //Make all first letters Capital letters in the aray and make them a string again.
    const splitAddress2 = e.split(" ");
    for (let i = 0; i < splitAddress2.length; i++) {
      splitAddress2[i] =
        splitAddress2[i].charAt(0).toUpperCase() +
        splitAddress2[i].slice(1).toLowerCase();
    }
    let newString = splitAddress2.join(" ");
    setFullAdress(newString);
    setStoredSearch(newString);
    setAdress(newString.replace(/ /g, "%20"));
  }

  const estateChanged = (e) => {
    for (let i = 0; i < estateTypes.length; i++) {
      if (e === estateTypes[i].id) {
        setEstateType(estateTypes[i].id);
      }
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    estateDetails = {
      price,
      size,
      zip,
      estateType,
      full_address: fullAdress,
    };
    {
      !zipValidator.navn ? showModal() : updateSellerInformation(e);
    }
  }

  function updateSellerInformation(e) {
    setSellerDetails({
      price: price,
      size: size,
      zip: zip,
      estateType: estateType,
      full_address: fullAdress,
    });
    // console.log(sellerDetails);
    router.push(
      `${e.target.action}?price=${price}&size=${size}&zipCode=${zip}`
    );
  }

  const showSearch = () => console.log(storedSearch);
  const showAdress = () => console.log(adress);

  return (
    <>
      <Head>
        <title>Estate Details | EDC</title>
      </Head>
      <Modal title="Address is not correct" open={isModalOpen} onOk={handleOk}>
        <p>Please make sure the full address is correct.</p>
        <p>It needs to include:</p>
        <ul>
          <li>Street name</li>
          <li>Street number</li>
          <li>Zip code</li>
        </ul>
      </Modal>
      <h1 className={styles.headline}>1. Estate Details</h1>
      <VisualSteps step={0} />
      <div className="wrapper">
        <h3 className={styles.headline_explainer}>
          First off, let us know a little bit more about your estate by filing
          out the details below.
        </h3>
        <div className={styles.content}>
          <h2>Estate information</h2>
          <div className={styles.grid_1_1}>
            <form
              onSubmit={onSubmit}
              action="/buyerdetails"
              method="GET"
              className={styles.form}
            >
              <label>
                <span className={styles.label}>Price</span>
                <InputNumber
                  className={styles.formInput}
                  name="price"
                  formatter={(value) =>
                    `DKK ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  }
                  parser={(value) => value.replace(/\s?DKK\s?|(\.)+/g, "")}
                  onChange={priceChanged}
                  value={price}
                  required
                />
              </label>
              <label>
                <span className={styles.label}>
                  Size in m<sup>2</sup>
                </span>
                <InputNumber
                  className={styles.formInput}
                  name="size"
                  type="number"
                  onChange={sizeChanged}
                  value={size}
                  required
                />
              </label>
              <label>
                <span className={styles.label}>Full address</span>
                <Select
                  className={styles.formInput}
                  showSearch
                  search={storedSearch}
                  // search={fullAdress}
                  defaultActiveFirstOption="true"
                  optionFilterProp="children"
                  onChange={zipChanged}
                  onSearch={adressChanged}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={dataF}
                />
              </label>
              <label>
                <span className={styles.label}>Estate type</span>
                <Select
                  className={styles.formInput}
                  showSearch
                  placeholder="Estate type"
                  optionFilterProp="children"
                  onChange={estateChanged}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={newEstates[0]}
                  defaultValue={sellerDetails.estateType}
                ></Select>
              </label>
              <button type="submit" className={styles.button}>
                Submit
              </button>
            </form>
            <Image
              className={styles.estateDetails_image}
              src="https://images.pexels.com/photos/8293702/pexels-photo-8293702.jpeg"
              alt="Three people discussing something over a table"
              placeholder="blurDataUrl"
              width="4500"
              height="3000"
            />
          </div>
        </div>
      </div>
      <button onClick={showSearch}>Show Search</button>
      <button onClick={showAdress}>Show Address</button>
    </>
  );
}
