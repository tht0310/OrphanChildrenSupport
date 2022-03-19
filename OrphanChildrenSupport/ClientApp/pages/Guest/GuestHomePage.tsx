import * as React from "react";
import { RouteComponentProps } from "react-router";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Slider from "@Components/shared/Slider";
import Section from "@Components/shared/Guest/Section";
import Block from "@Components/shared/Block";

type Props = RouteComponentProps<{}>;

const GuestHomePage: React.FC<Props> = () => {
  return (
    <div>
      <Slider />
      <Section />
      <Page2 />
      <Page1 />
      <Block children={null} />
    </div>
  );
};

export default GuestHomePage;
