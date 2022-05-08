import { FC, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Card, Carousel, Col, Divider, List, Row, Image } from "antd";
import React from "react";
import Children1 from "@Images/child1.jpg";
import { IPersonalProfileModel } from "@Models/IPersonalProfileModel";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { displayDate } from "@Services/FormatDateTimeService";
import Children from "@Images/child1.jpg";
import Slider from "react-slick";

import FallBackImage from "@Images/children-default.png";
interface Props {
  children: IPersonalProfileModel;
}

const childrenProfileService = new ChildrenProfileService();
const childrenDetailUrl = "children/detail";
const Section: FC<Props> = ({ children }: Props) => {
  const [childrenProfiles, setChildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  useEffect(() => {
    document.title = "Children list";
    fetchData();
  }, []);
  async function fetchData() {
    fetchChildrenProfile();
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  async function fetchChildrenProfile() {
    const dataRes = await childrenProfileService.search({ pageSize: 4 });
    if (!dataRes.hasErrors) {
      setChildrenProfiles(dataRes.value.items);
      console.log(dataRes.value.items);
    }
  }
  return <div></div>;
};

export default Section;
