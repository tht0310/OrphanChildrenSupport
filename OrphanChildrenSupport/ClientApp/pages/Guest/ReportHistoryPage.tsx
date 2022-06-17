import React, { useState } from "react";
import {
  Space,
  Tag,
  Image,
  List,
  Card,
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
} from "antd";
import {
  CalendarOutlined,
  SearchOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";

import { IRegisterModel } from "@Models/ILoginModel";
import { Link } from "react-router-dom";
import ReportInformationModal from "@Components/modals/ReportInformationModel";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import ReportService from "@Services/ReportService";
import { IReportModel } from "@Models/IReportModel";
import { displayDate } from "@Services/FormatDateTimeService";

interface Props {}

const childrenService = new ChildrenProfileService();
const reportService = new ReportService();

const ReportHistoryPage: React.FC<Props> = () => {
  const [isChildrenModal, setChildrenModal] = React.useState<boolean>(false);
  const [modelForEdit, setmodelForEdit] = React.useState<IReportModel>();
  const [currentUser, setCurrentUser] = React.useState<IRegisterModel>();
  const [childrenProfiles, setchildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);
  const [report, setReport] = React.useState<IReportModel[]>([]);
  const [active, setActive] = useState("1");

  const handleClick = (event) => {
    setActive(event.target.id);
  };

  React.useEffect(() => {
    getCurrentUser();
    fetchChildrenProfile();
    fetchReport();
  }, []);

  async function toggleChildrenModal() {
    setChildrenModal(!isChildrenModal);
    setmodelForEdit(null);
  }

  async function fetchChildrenProfile() {
    const dataRes = await childrenService.getAll();
    if (!dataRes.hasErrors) {
      setchildrenProfiles(dataRes.value.items);
    }
  }

  function getStatus(id: number) {
    let name = "";
    switch (id) {
      case 0:
        name = "Waiting For Approval";
        break;
      case 1:
        name = "Approved";
        break;
      case 2:
        name = "Rejected";
        break;
      case 3:
        name = "Canceled";
        break;
    }
    return name;
  }

  function getCurrentUser() {
    var retrievedObject = localStorage.getItem("currentUser");
    if (retrievedObject) {
      setCurrentUser(JSON.parse(retrievedObject));
    }
  }

  function findUserbyId(id: number, list) {
    let index;
    if (id) {
      index = list.findIndex((item) => id === item.id);
    }
    return index;
  }

  async function fetchReport() {
    const res = await reportService.getAll();
    if (!res.hasErrors) {
      setReport(res.value.items);
    }
  }

  return (
    <>
      <div>
        <Row
          style={{
            marginBottom: "25px",
            padding: "22px 9% 0px 3%",
            border: "1px solid #D8D8D8",
            borderRadius: "6px",
          }}
        >
          <Col span={24}>
            <Form>
              <Row>
                <Col xs={22} lg={15} style={{ paddingRight: "15px" }}>
                  <Form.Item name="title">
                    <Input
                      style={{ fontSize: "14px" }}
                      placeholder={"Enter children name"}
                    />
                  </Form.Item>
                </Col>
                <Col xs={22} lg={8}>
                  <Form.Item name="donationStatus">
                    <Select defaultValue={"null"}>
                      <Select.Option value="null">All status</Select.Option>
                      <Select.Option value="0">Send</Select.Option>
                      <Select.Option value="1">Verification</Select.Option>
                      <Select.Option value="2">Reporting</Select.Option>
                      <Select.Option value="3">Finish</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={1} xs={22} lg={1} style={{ paddingLeft: "11px" }}>
                  <Button
                    style={{
                      fontSize: "14px",
                      background: "#e57905",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        <List
          grid={{ gutter: 18, column: 1 }}
          dataSource={report}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
          }}
          renderItem={(item) => (
            <List.Item onClick={() => setmodelForEdit(item)}>
              <Card
                className="ant-card-custom"
                size="small"
                title={
                  <>
                    <span style={{ color: "#808089", fontSize: "13px" }}>
                      <ShopOutlined style={{ color: "#808089" }} />
                      {getStatus(item?.reportStatus)}
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
                          <a
                            onClick={toggleChildrenModal}
                            style={{ color: "#e57905" }}
                          >
                            {
                              childrenProfiles[
                                findUserbyId(
                                  item?.childrenProfileId,
                                  childrenProfiles
                                )
                              ]?.fullName
                            }
                          </a>
                        </div>
                        <div style={{ fontSize: "12px", color: "#b2b2b2" }}>
                          <CalendarOutlined
                            style={{ color: "#b2b2b2", fontSize: "11px" }}
                          />
                          {displayDate(
                            childrenProfiles[
                              findUserbyId(
                                item?.childrenProfileId,
                                childrenProfiles
                              )
                            ]?.dob
                          )}
                        </div>
                      </div>
                    </Space>
                  </Col>
                  <Col span={9} style={{ marginTop: "20px" }}></Col>
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
                      {displayDate(item?.createdTime)}
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
