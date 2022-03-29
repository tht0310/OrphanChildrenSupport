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

  async function fetchChildrenProfile() {
    const dataRes = await childrenProfileService.search({ pageSize: 4 });
    if (!dataRes.hasErrors) {
      setChildrenProfiles(dataRes.value.items);
      console.log(dataRes.value.items);
    }
  }
  return (
    <div className="container">
      <h3 className="topic-name">Our children</h3>
      <List
        grid={{ gutter: 18, column: 4 }}
        dataSource={childrenProfiles}
        renderItem={(item) => (
          <List.Item>
            <div className="box7">
              <Link to={`${childrenDetailUrl}/${item.id}`} target="_blank">
                <Image
                  preview={false}
                  className="img-item"
                  src={childrenProfileService.getImageUrl(item.id)}
                  fallback={FallBackImage}
                  alt={"img" + item.id}
                />
                <div className="box-content">
                  <div className="title">{item.fullName}</div>
                  <span className="post">
                    Birthday: {displayDate(item.dob)}
                  </span>
                  <Button ghost>View more</Button>
                </div>
              </Link>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Section;
