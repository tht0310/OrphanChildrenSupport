import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Carousel } from "antd";
import React from "react";
import Children2 from "@Images/children2.png";

interface Props {}

const Slider: FC<Props> = () => {
  return (
    <div>
      <Carousel autoplay className="carousel">
        <div>
          <h3
            style={{
              height: "80%",
              fontSize: "60px",
              color: "#fff",
              lineHeight: "400px",
              textAlign: "center",
              backgroundImage: `url(${Children2})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            FOR THE CHILDREN
          </h3>
        </div>
      </Carousel>

      <br />
    </div>
  );
};

export default Slider;
