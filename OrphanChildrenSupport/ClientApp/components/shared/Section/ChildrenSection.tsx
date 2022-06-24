import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Area } from "@ant-design/plots";
import { IDonationTimesModel } from "@Models/IStatisticModel";

export interface IProps {
  data: IDonationTimesModel[];
}

const ChildrenSection: React.FC<IProps> = ({ data }: IProps) => {
  const config = {
    data,
    xField: "month",
    yField: "value",

    xAxis: {
      range: [0, 1],
    },
  };
  return <Area color={"#FFA07A"} {...config} />;
};

export default ChildrenSection;
