import { Col, Row, Tabs } from "antd";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Pie } from "@ant-design/plots";

type Props = RouteComponentProps<{}>;

const DonutPieChart: React.FC<Props> = () => {
  const data = [
    {
      type: "Sucessful",
      value: 27,
    },
    {
      type: "Rejected",
      value: 25,
    },
    {
      type: "Canceled",
      value: 18,
    },
    {
      type: "Waiting",
      value: 15,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return <Pie width={150} height={200} {...config} />;
};

export default DonutPieChart;
