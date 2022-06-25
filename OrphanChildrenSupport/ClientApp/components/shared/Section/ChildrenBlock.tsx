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
const childrenDetailUrl = "children";
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
          <div
            style={{
              margin: "5px",
              fontSize: "20px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {title}
          </div>
          <h2
            style={{
              color: "#88181b",
              fontWeight: "bold",
              marginBottom: "20px",
              marginTop: "5px",
              textAlign: "center",
              fontSize: "28px",
            }}
          >
            {subTitle}
          </h2>
          <div
            style={{
              borderBottom: "1px solid red",
              width: "30px",
              margin: "auto",
              marginBottom: "20px",
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
              if (i > 5) {
                return null;
              }
              return (
                <Col
                  key={i}
                  className="col"
                  lg={4}
                  xs={12}
                  style={{ textAlign: "center" }}
                >
                  <Link to={`${childrenDetailUrl}/${d.id}`} target="_blank">
                    <div className="item">
                      <Image
                        preview={false}
                        className="img-item"
                        src={childrenProfileService.getImageUrl(d?.imageId)}
                        alt={"img" + d.imageId}
                      />
                      <div className="info">
                        <h3>{d.fullName}</h3>
                        <p className="descroption">
                          {d.age + " years old"} |{d.gender ? " Boy" : " Girl"}
                        </p>
                        <p className="descroption">{d.publicAddress}</p>
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
