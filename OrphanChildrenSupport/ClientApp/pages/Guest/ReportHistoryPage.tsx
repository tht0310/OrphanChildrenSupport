import React, { useState } from "react";
import { Space, Tag, Image, List, Card, Col, Row, Input, Button } from "antd";
import {
  CalendarOutlined,
  SearchOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";

import { IRegisterModel } from "@Models/ILoginModel";
import { Link } from "react-router-dom";
import ReportInformationModal from "@Components/modals/ReportInformationModel";

interface Props {}

const ReportHistoryPage: React.FC<Props> = () => {
  const [isChildrenModal, setChildrenModal] = React.useState<boolean>(false);
  const [modelForEdit, setmodelForEdit] =
    React.useState<IChildrenProfileModel>();
  const [currentUser, setCurrentUser] = React.useState<IRegisterModel>();

  const [active, setActive] = useState("1");

  const handleClick = (event) => {
    setActive(event.target.id);
  };

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  async function toggleChildrenModal() {
    setChildrenModal(!isChildrenModal);
    setmodelForEdit(null);
  }

  function getCurrentUser() {
    var retrievedObject = localStorage.getItem("currentUser");
    if (retrievedObject) {
      setCurrentUser(JSON.parse(retrievedObject));
    }
  }

  React.useEffect(() => {}, []);

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["Date of Birth", "Gender"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["Name"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["Address", "Circumstance"],
    },
  ];
  return (
    <>
      <div>
        <Row
          style={{
            marginBottom: "15px",
            border: "1.5px solid #e57905",
            marginTop: "11px",
          }}
        >
          <Col
            style={{
              fontSize: "15px",
              textAlign: "center",
            }}
            span={5}
          >
            <button
              key={1}
              id={"1"}
              className={`btn-change-tab ${active === "1" ? "active" : ""}`}
              onClick={handleClick}
            >
              All status
            </button>
          </Col>
          <Col
            style={{
              fontSize: "15px",
              textAlign: "center",
            }}
            span={5}
          >
            <button
              key={2}
              className={`btn-change-tab ${active === "2" ? "active" : ""}`}
              id={"2"}
              onClick={handleClick}
            >
              Send
            </button>
          </Col>
          <Col
            style={{
              fontSize: "15px",
              textAlign: "center",
            }}
            span={5}
          >
            <button
              key={3}
              className={`btn-change-tab ${active === "3" ? "active" : ""}`}
              id={"3"}
              onClick={handleClick}
            >
              Verification
            </button>
          </Col>
          <Col
            style={{
              fontSize: "15px",
              textAlign: "center",
            }}
            span={5}
          >
            <button
              key={4}
              id={"4"}
              className={`btn-change-tab ${active === "4" ? "active" : ""}`}
              onClick={handleClick}
            >
              Confirming
            </button>
          </Col>
          <Col
            style={{
              fontSize: "15px",
              textAlign: "center",
            }}
            span={4}
          >
            <button
              key={1}
              id={"5"}
              className={`btn-change-tab ${active === "5" ? "active" : ""}`}
              onClick={handleClick}
            >
              Finish
            </button>
          </Col>
        </Row>
        <Row style={{ marginBottom: "15px" }}>
          <Col span={22}>
            <Input
              style={{ fontSize: "12px" }}
              placeholder={"Enter children name"}
            />
          </Col>
          <Col span={2} style={{ paddingLeft: "11px" }}>
            <Button
              style={{
                width: "100%",
                fontSize: "13px",
                background: "#e57905",
                color: "white",
                padding: "2px 0px",
                height: "28px",
              }}
            >
              Search
            </Button>
          </Col>
        </Row>

        <List
          grid={{ gutter: 18, column: 1 }}
          dataSource={data}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
          }}
          renderItem={(item) => (
            <List.Item>
              <Card
                className="ant-card-custom"
                size="small"
                title={
                  <>
                    <span style={{ color: "#808089", fontSize: "13px" }}>
                      <ShopOutlined style={{ color: "#808089" }} />
                      Processing
                    </span>
                    <span style={{ float: "right" }}>
                      <button
                        style={{
                          border: "none",
                          background: "#fff",
                          color: "#e57905",
                          marginRight: "20px",
                        }}
                        onClick={toggleChildrenModal}
                      >
                        View more
                      </button>
                    </span>
                  </>
                }
                style={{ width: "100%" }}
              >
                <Row>
                  <Col span={12}>
                    <Space>
                      <Image
                        preview={false}
                        className="img-item"
                        width={"111px"}
                        src={
                          "https://anhvienmimosa.com/wp-content/uploads/2019/04/10-y-tuong-chup-anh-chan-dung-cho-dep-tuyet-1.jpg"
                        }
                      />
                      <div style={{ marginLeft: "11px", textAlign: "left" }}>
                        <div
                          style={{
                            marginBottom: "5px",
                            color: "black",
                            fontSize: "14px",
                          }}
                        >
                          <Link to={"/detail/1"} style={{ color: "#e57905" }}>
                            Lê Ngọc Linh Chi
                          </Link>
                        </div>
                        <div style={{ fontSize: "12px", color: "#b2b2b2" }}>
                          <CalendarOutlined
                            style={{ color: "#b2b2b2", fontSize: "11px" }}
                          />
                          14/10/2019
                        </div>
                      </div>
                    </Space>
                  </Col>
                  <Col span={9} style={{ marginTop: "20px" }}>
                    <div style={{ fontSize: "14px" }}>
                      {item.tags.map((tag) => {
                        return (
                          <Tag
                            color="default"
                            style={{
                              fontSize: "13px",
                            }}
                            key={tag}
                          >
                            {tag}
                          </Tag>
                        );
                      })}
                    </div>
                  </Col>
                  <Col
                    span={3}
                    style={{
                      textAlign: "center",
                      marginTop: "15px",
                      fontSize: "13px",
                    }}
                  >
                    <div>Created date</div>
                    <div style={{ marginLeft: "2px", color: "#b2b2b2" }}>
                      10/05/2022
                    </div>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
        <ReportInformationModal
          visible={isChildrenModal}
          onCancel={toggleChildrenModal}
          data={modelForEdit}
          currentUser={currentUser}
        />
      </div>
    </>
  );
};

export default ReportHistoryPage;
