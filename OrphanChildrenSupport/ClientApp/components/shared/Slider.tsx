import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Carousel } from "antd";
import React from "react";
import Children2 from "@Images/children2.png";

interface Props {}

const Slider: FC<Props> = () => {
  return (
    <div >
      <Carousel autoplay className="carousel">
        <div>
          <img className="custombanner" src={Children2} />
        </div>
        {/* <div>
          <img className="custombanner" src={Children2} />
        </div> */}
      </Carousel>

      <br />
    </div>
  );
};

export default Slider;
