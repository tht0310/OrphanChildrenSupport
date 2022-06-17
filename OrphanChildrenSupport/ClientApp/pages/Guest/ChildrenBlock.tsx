import React from "react";
import QueueAnim from "rc-queue-anim";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import { Row, Col, Image } from "antd";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { Link } from "react-router-dom";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { displayDate } from "@Services/FormatDateTimeService";

export interface IProps {
  children: IChildrenProfileModel[];
  title?: String;
  subTitle?: String;
}
const childrenProfileService = new ChildrenProfileService();
const childrenDetailUrl = "children/detail";
const ChildrenBlock: React.FC<IProps> = ({
  children,
  title,
  subTitle,
}: IProps) => {
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
    <div
      className="home-layout-wrapper3 home-case-wrapper content-wrapper-custom"
      style={{
        minHeight: "300px",
        marginBottom: "20px",
      }}
    >
      <OverPack className="home-layout" playScale={0.4}>
        <QueueAnim
          className="home-case"
          type="bottom"
          key="home-case"
          ease="easeOutQuart"
          leaveReverse
        >
          <h2
            style={{
              color: "#88181b",
              fontWeight: "bold",
              marginBottom: "5px",
              marginTop: "10px",
              textAlign: "center",
              fontSize: "28px",
            }}
          >
            {title}
          </h2>
          <div
            style={{
              margin: "5px",
              fontSize: "17px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {subTitle}
          </div>
          <div
            style={{
              borderBottom: "1px solid red",
              width: "30px",
              margin: "auto",
              marginBottom: "25px",
              height: "5px",
              background: "#88181b",
              borderRadius: "5px",
            }}
          ></div>

          <i key="i" className="line" />
          <QueueAnim
            key="content"
            component={Row}
            type="bottom"
            componentProps={{ gutter: 171 }}
          >
            {children.map((d, i) => {
              if (i > 6) {
                return null;
              }
              return (
                <Col key={i} className="col" lg={4} xs={12}>
                  <Link to={`${childrenDetailUrl}/${d.id}`} target="_blank">
                    <div className="item">
                      <Image
                        preview={false}
                        className="img-item"
                        src={childrenProfileService.getImageUrl(d.id)}
                        alt={"img" + d.id}
                      />
                      <div className="info">
                        <h3>{d.fullName}</h3>
                        <p className="descroption">
                          {displayDate(d.dob)} | Gender:
                          {d.gender ? " Boy" : " Girl"}
                        </p>
                        <p className="descroption">
                          {convertAddressToString(d.publicAddress)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </QueueAnim>
        </QueueAnim>
      </OverPack>
    </div>
  );
};

export default ChildrenBlock;
