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
interface Props {}

const childrenProfileService = new ChildrenProfileService();
const childrenDetailUrl = "children";
const ChildrenBlock: FC<Props> = ({}: Props) => {
  const [childrenProfiles, setChildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  useEffect(() => {
    document.title = "FOR THE CHILDREN";
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
    }
  }

  function convertAddressToString(address: string) {
    const tempAddress = address.split("-");
    let result = "";
    tempAddress.reverse();
    tempAddress.map((v) => {
      result += v + " ";
    });

    return result;
  }
  return (
    <div className="block-children content-wrapper-custom items">
      {" "}
      <List
        grid={{ gutter: 18, column: 4 }}
        dataSource={childrenProfiles}
        renderItem={(item) => (
          <List.Item>
            <Link to={`${childrenDetailUrl}/${item.id}`}>
              <div className="item">
                <Image
                  preview={false}
                  className="img-item"
                  src={childrenProfileService.getImageUrl(item.id)}
                  fallback={FallBackImage}
                  alt={"img" + item.id}
                />
                <div className="info">
                  <h3>{item.fullName}</h3>
                  <p className="descroption">
                    {item.age + " years old"} | {item.gender ? " Boy" : " Girl"}
                  </p>
                  <p className="descroption">{item.publicAddress}</p>
                </div>
              </div>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ChildrenBlock;
