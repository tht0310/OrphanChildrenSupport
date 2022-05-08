import React, { FC } from "react";
import PropTypes from "prop-types";
import GitHubButton from "react-github-button";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { Button } from "antd";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Children from "@Images/test.jpg";
const loop = {
  duration: 3000,
  yoyo: true,
  repeat: -1,
};

interface Props extends RouteComponentProps {}

const Banner: FC<Props> = () => {
  {
    return (
      <div className="banner-wrapper">
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <div className="home-banner-image">
            <img alt="banner" width="100%" />
          </div>
        </TweenOne>
        <QueueAnim className="banner-title-wrapper" type={"right"}>
          <div key="line" className="title-line-wrapper">
            <div
              className="title-line"
              style={{ transform: "translateX(-64px)" }}
            />
          </div>
          <h1 key="h1">FOR THE CHILDREN</h1>
          <p key="content"></p>
          <div key="button" className="button-wrapper">
            <a
              href="http://preview.pro.ant.design"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="primary"></Button>
            </a>

            <GitHubButton
              key="github-button"
              type="stargazers"
              namespace="ant-design"
              repo="ant-design-pro"
            />
          </div>
        </QueueAnim>
      </div>
    );
  }
};

export default withRouter(Banner);
