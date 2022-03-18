import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Helmet } from "react-helmet";
import logo from "@Images/logo.png";
import GuestTopMenu from "@Components/shared/Guest/GuestTopMenu";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Slider from "@Components/shared/Slider";
import Page3 from "./Page3";
import Section from "@Components/shared/Guest/Section";
import Footer from "@Components/shared/Guest/Footer";
import Block from "@Components/shared/Block";


type Props = RouteComponentProps<{}>;

const GuestHomePage: React.FC<Props> = () => {
  return (
    <div>
      <Slider/>
      <Section/>
      <Page2 />
      <Page1 />
      <Block children={null}/>
    </div>
  );
};

export default GuestHomePage;
