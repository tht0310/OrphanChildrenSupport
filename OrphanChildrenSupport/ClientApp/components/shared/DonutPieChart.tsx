import * as React from "react";
import { Pie } from "@ant-design/plots";
import { IReportStatisticModel } from "@Models/IStatisticModel";

export interface IProps {
  data: IReportStatisticModel | any;
}

const DonutPieChart: React.FC<IProps> = ({ data }: IProps) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: "percentage",
    colorField: "status",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) =>
        percent == 0 ? `` : `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 11,
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
