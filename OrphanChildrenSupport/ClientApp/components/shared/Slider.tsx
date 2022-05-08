import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Carousel } from "antd";
import React from "react";
import Children2 from "@Images/test.jpg";
import Children3 from "@Images/child-vid-2.mp4";
import Banner from "./Banner";
import ExamplePage from "@Pages/ExamplesPage";
interface Props {}

const Slider: FC<Props> = () => {
  return (
    <Carousel className="carousel">
      <div>
        <h3
          style={{
            height: "92%",
            fontSize: "20px",
            color: "#fff",
            textAlign: "center",
            backgroundImage: `url(${Children2})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            filter: "brightness(90%)",
          }}
        >
          {/* Our vision is to release the children from spiritual, economic,
            social, and physical poverty. */}
        </h3>
      </div>
    </Carousel>
  );
};

export default Slider;
