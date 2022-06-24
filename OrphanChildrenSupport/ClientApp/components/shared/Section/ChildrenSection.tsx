import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Area } from "@ant-design/plots";

export interface IProps {
  data: any;
}

const ChildrenSection: React.FC<IProps> = ({ data }: IProps) => {
  React.useEffect(() => {}, []);

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
