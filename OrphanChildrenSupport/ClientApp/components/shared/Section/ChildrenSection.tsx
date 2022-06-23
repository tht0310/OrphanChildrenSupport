import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Area } from "@ant-design/plots";

type Props = RouteComponentProps<{}>;

const ChildrenSection: React.FC<Props> = () => {
  React.useEffect(() => {}, []);

  const data = [
    {
      year: "1991",
      value: 3,
      category: "Liquid fuel",
    },
    {
      year: "1992",
      value: 4,
      category: "Liquid fuel",
    },
    {
      year: "1993",
      value: 3.5,
      category: "Liquid fuel",
    },
    {
      year: "1994",
      value: 5,
      category: "Liquid fuel",
    },
    {
      year: "1995",
      value: 4.9,
      category: "Liquid fuel",
    },
    {
      year: "1996",
      value: 6,
    },
    {
      year: "1997",
      value: 14,
    },
    {
      year: "1998",
      value: 5,
    },
    {
      year: "1999",
      value: 3,
    },
  ];

  const config = {
    data,
    xField: "year",
    yField: "value",

    xAxis: {
      range: [0, 1],
    },
  };
  return <Area color={"#FFA07A"} {...config} />;
};

export default ChildrenSection;
