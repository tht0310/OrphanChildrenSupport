import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Carousel } from "antd";
import React from "react";
import Children2 from "@Images/test.jpg";

import { Row, Col, Image } from "antd";
interface Props {}

const Slider: FC<Props> = () => {
  return (
    <div className="slideshow-container">
      <Carousel className="carousel">
        <div>
          <h3
            style={{
              color: "#fff",
              height: "92%",
              fontSize: "20px",
              textAlign: "center",
              backgroundImage: `url(${Children2})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              filter: "brightness(90%)",
            }}
          >
            {/* {/* Our vision is to release the children from spiritual, economic,
            social, and physical poverty. */}
          </h3>
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
