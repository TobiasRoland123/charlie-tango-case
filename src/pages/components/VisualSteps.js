import { Steps } from "antd";
import {
  HomeFilled,
  SmileOutlined,
  ContactsFilled,
  EditFilled,
} from "@ant-design/icons";
import styles from "../Home.module.css";

export default function VisualSteps(props) {
  // console.log(props.current);

  // function checkStatus(val) {
  //   console.log("props.current:", props.current);
  //   if (val < props.current) {
  //     return "finish";
  //   } else if (val === props.current) {
  //     return "process";
  //   } else if (val > props.current) {
  //     return "wait";
  //   }
  // }

  return (
    <>
      <Steps
        className={styles.visualSteps}
        size="small"
        current={props.current}
        items={[
          {
            title: "Estate details",
            // status: checkStatus(0),
            // icon: <HomeFilled />,
          },
          {
            title: "Potential Buyers",
            // status: checkStatus(1),
            // icon: <ContactsFilled />,
          },
          {
            title: "Personal info",
            // status: checkStatus(2),
            // icon: <EditFilled />,
          },
          {
            title: "Done!",
            // status: checkStatus(3),
            // icon: <SmileOutlined />,
          },
        ]}
      />
    </>
  );
}
