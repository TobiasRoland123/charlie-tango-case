import { Steps } from "antd";
import {
  HomeFilled,
  SmileOutlined,
  ContactsFilled,
  EditFilled,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import styles from "../pages/Home.module.css";

export default function VisualSteps(props) {
  //   const useWidth = () => {
  //     const [width, setWidth] = useState(0);
  //     const handleResize = () => setWidth(window.innerWidth);
  //     useEffect(() => {
  //       window.addEventListener("resize", handleResize);
  //       return () => window.removeEventListener("resize", handleResize);
  //     }, [width]);
  //     return width;
  //   };

  //   // useEffect(() => {
  //   //   const handleResizeWindow = () => setWidth(window.innerWidth);
  //   //   if (typeof window !== "undefined") {
  //   //     /* we're on the server */
  //   //     window.addEventListener("resize", handleResizeWindow);
  //   //     return () => {
  //   //       window.removeEventListener("resize", handleResizeWindow);
  //   //     };
  //   //   }
  //   // }, []);
  //   // console.log(props.current);

  function checkStatus(val) {
    // console.log("props.step:", props.step);
    if (val < props.step) {
      return "finish";
    } else if (val === props.step) {
      return "process";
    } else if (val > props.step) {
      return "wait";
    }
  }

  return (
    <>
      <Steps
        className={styles.visualStepsHor}
        size="small"
        direction={"horizontal"}
        items={[
          {
            title: "Estate details",
            status: checkStatus(0),
            // icon: <HomeFilled />,
          },
          {
            title: "Potential Buyers",
            status: checkStatus(1),
            // icon: <ContactsFilled />,
          },
          {
            title: "Personal info",
            status: checkStatus(2),
            // icon: <EditFilled />,
          },
          {
            title: "Done!",
            status: checkStatus(3),
            // icon: <SmileOutlined />,
          },
        ]}
      />
      <button onClick={() => console.log(width)}>Width</button>
    </>
  );
}
