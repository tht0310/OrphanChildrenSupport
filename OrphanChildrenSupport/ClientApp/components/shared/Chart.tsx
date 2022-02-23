import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ChartSample() {
  const [dataSample, setDataSample] = useState({
    options: {
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "1/22/20",
          "2/1/20",
          "2/15/20",
          "3/1/20",
          "3/15/20",
          "4/1/20",
          "4/15/20",
          "5/1/20",
          "5/7/20",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
    },
    series: [
      {
        name: "Cases",
        data: [
          555, 12038, 69030, 88369, 167466, 932638, 2055423, 3343777, 3845718,
        ],
      },
      {
        name: "Recovered",
        data: [28, 284, 9394, 42710, 76026, 191853, 501538, 1029651, 1255481],
      },
      {
        name: "Deaths",
        data: [17, 259, 1666, 2996, 6472, 49675, 140658, 238619, 269567],
      },
    ],
  });
  

  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
     
      <Chart
        options={dataSample.options}
        series={dataSample.series}
        type="area"
        height={350}
      />

    </div>
  );
}
