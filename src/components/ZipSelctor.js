import { Select } from "antd";
import { useState, useEffect } from "react";

// const onChange = (value: string) => {
//   console.log(`selected ${value}`);
// };

// const onSearch = (value: string) => {
//   console.log("search:", value);
// };

export default function ZipSelctor(props) {
  const [zip, setZip] = useState(props.zip);
  const [adress, setAdress] = useState();
  const [dataF, setDataF] = useState();

  const adressChanged = (e) => {
    console.log(e);
    setAdress(e.replace(/ /g, "%20"));
  };

  const changeZip = (e) => {
    console.log(e);
    const splitAdress = e.split(" ");
    const newZip = splitAdress[splitAdress.length - 2];
    setZip(newZip);
  };

  useEffect(() => {
    // console.log(adress);
    fetch(`https://api.dataforsyningen.dk/autocomplete?q=${adress}&fuzzy=`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data.tekst);
        const nyeForslag = data.map((adr) => ({
          value: adr.forslagstekst.toLowerCase(),
          label: adr.forslagstekst,
        }));
        // console.log(nyeForslag);
        setDataF(nyeForslag);
      });
  }, [adress]);
  return (
    <>
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={changeZip}
        onSearch={adressChanged}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={dataF}
      />
    </>
  );
}
