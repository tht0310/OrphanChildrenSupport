import React from "react";
import PropTypes from "prop-types";
import TweenOne from "rc-tween-one";
import ScrollOverPack from "rc-scroll-anim/lib/ScrollOverPack";
import { Button } from "antd";
import QueueAnim from "rc-queue-anim";
interface Props {}
const isMobile = false;
const Page3: React.FC<Props> = () => {
  return (
    <ScrollOverPack
      id="page3"
      className="content-wrapper page"
      style={{ marginTop: "100px" }}
    >
      <TweenOne
        key="image"
        className="image3 image-wrapper"
        animation={{ x: 0, opacity: 1, ease: "easeOutQuad" }}
        style={{ transform: "translateX(-100px)", opacity: 0 }}
      />
      <QueueAnim
        className="text-wrapper"
        key="text"
        type={isMobile ? "bottom" : "right"}
        leaveReverse
      >
        <h2 key="h2" style={{ color: "#88181b", fontWeight: "bold" }}>
          Who we are ?
        </h2>
        <div
          style={{
            borderBottom: "1px solid red",
            width: "30px",
            marginBottom: "15px",
            height: "5px",
            background: "#88181b",
            borderRadius: "5px",
          }}
        ></div>
        <p key="p" style={{ maxWidth: 500 }}>
          We are volunteers to connect sponsors to orphan children. Its our
          desire for every child to experience unconditional love, hope and
          safety.
        </p>

        <div key="button">
          <a>
            <Button
              style={{
                background: "#88181b",
                color: "white",
                border: "none",
                borderRadius: "25px",
              }}
              danger
            >
              View more
            </Button>
          </a>
        </div>
      </QueueAnim>
    </ScrollOverPack>
  );
};
export default Page3;
