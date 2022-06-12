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
      "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    xField: "year",
    yField: "value",
    seriesField: "category",
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: ["#1979C9", "#D62A0D", "#FAA219"],
  };
  return <Line {...config} />;
};

export default ChildrenSection;
