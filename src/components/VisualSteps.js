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
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  // console.log(props.current);

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
        className={styles.visualSteps}
        size="small"
        direction={width < 768 ? "vertical" : "horizontal"}
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
    </>
  );
}
