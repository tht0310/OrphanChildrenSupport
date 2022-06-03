import { Col, Row, Tabs } from "antd";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Line } from "@ant-design/plots";

type Props = RouteComponentProps<{}>;

const ChildrenSection: React.FC<Props> = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    xField: "Date",
    yField: "scales",
    xAxis: {
      tickCount: 5,
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };

  return <Line {...config} />;
};

export default ChildrenSection;
