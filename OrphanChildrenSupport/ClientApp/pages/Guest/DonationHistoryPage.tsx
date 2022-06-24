import React, { useState } from "react";
import {
  Space,
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
import { CalendarOutlined, ShopOutlined } from "@ant-design/icons";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { ILoginModel, IRegisterModel } from "@Models/ILoginModel";
import DonationService from "@Services/DonationService";
import { IDonationModel } from "@Models/IDonationModel";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { displayDate } from "@Services/FormatDateTimeService";
import AccountService from "@Services/AccountService";
import DonationHistoryModal from "@Components/modals/User/DonationHistoryModal";
import { getStatus } from "@Services/FormatStatusService";

interface Props {}

const donationService = new DonationService();
const childrenService = new ChildrenProfileService();
const userService = new AccountService();
const childrenProfileService = new ChildrenProfileService();

const DonationHistoryPage: React.FC<Props> = () => {
  const [form] = Form.useForm();
  const [isChildrenModal, setChildrenModal] = React.useState<boolean>(false);
  const [modelForEdit, setmodelForEdit] = React.useState<IDonationModel>();
  const [currentUser, setCurrentUser] = React.useState<IRegisterModel>();
  const [donation, setDonation] = React.useState<IDonationModel[]>([]);
  const [childrenProfiles, setchildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);

  const [localUser, setLocalUser] = React.useState<ILoginModel>(null);

  React.useEffect(() => {
    getLocalUser();
  }, []);
  React.useEffect(() => {
    if (localUser) {
      fetchUser(localUser.id);
    }
  }, [localUser]);

  React.useEffect(() => {
    if (currentUser) {
      fetchChildrenProfile();
    }
  }, [currentUser?.id]);

  React.useEffect(() => {
    if (childrenProfiles.length > 0) {
      fetchDonation();
    }
  }, [childrenProfiles, donation]);

  function getLocalUser() {
    var retrievedObject = localStorage.getItem("currentUser");
    if (retrievedObject) {
      setLocalUser(JSON.parse(retrievedObject));
    }
  }

  async function getImage(id: number) {
    const imageRes = await childrenProfileService.getChildrenImage(id);
    const imageData = imageRes.value.items;

    if (imageData.length > 0) {
      return imageData[0].id;
    } else {
      return -1;
    }
  }
  function toggleChildrenModal() {
    setChildrenModal(!isChildrenModal);
    setmodelForEdit(null);
  }

  async function fetchUser(id) {
    const res = await userService.getAccount(id);
    if (!res.hasErrors) {
      setCurrentUser(res.value);
    }
  }

  async function fetchChildrenProfile() {
    const dataRes = await childrenService.getAll();
    if (!dataRes.hasErrors) {
      setchildrenProfiles(dataRes.value.items);
    }
  }

  async function fetchDonation() {
    const res = await donationService.getAll({ accountId: currentUser?.id });
    if (!res.hasErrors) {
      const tempValue = res.value.items;

      for (let index = 0; index < tempValue.length; index++) {
        let findIndex = childrenProfiles.findIndex(
          (item) => tempValue[index].childrenProfileId === item.id
        );
        tempValue[index].childrenProfile = childrenProfiles[findIndex];
        tempValue[index].imageId = await getImage(
          tempValue[index].childrenProfileId
        );
      }

      setDonation(tempValue);
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
            <Form form={form}>
              <Row>
                <Col xs={22} lg={15} style={{ paddingRight: "15px" }}>
                  <Form.Item name="fullName">
                    <Input
                      style={{ fontSize: "14px" }}
                      placeholder={"Enter children name"}
                    />
                  </Form.Item>
                </Col>
                <Col xs={22} lg={8}>
                  <Form.Item name="status">
                    <Select defaultValue={"null"}>
                      <Select.Option value="null">All status</Select.Option>
                      <Select.Option value="0">
                        Waiting for Approve
                      </Select.Option>
                      <Select.Option value="1">Processing</Select.Option>
                      <Select.Option value="2">Finish</Select.Option>
                      <Select.Option value="3">Canceled</Select.Option>
                      <Select.Option value="4">Rejected</Select.Option>
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
          dataSource={donation}
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
                      {getStatus(item?.status)}
                    </span>
                    <span style={{ float: "right" }}>
                      <button
                        style={{
                          border: "none",
                          background: "#fff",
                          color: "#e57905",
                          marginRight: "20px",
                          fontSize: "15px",
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
                        src={childrenProfileService.getImageUrl(item?.imageId)}
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
                            {item.childrenProfile.fullName}
                          </a>
                        </div>
                        <div style={{ fontSize: "12px", color: "#b2b2b2" }}>
                          <CalendarOutlined
                            style={{ color: "#b2b2b2", fontSize: "11px" }}
                          />
                          {displayDate(item.childrenProfile.dob)}
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
        <DonationHistoryModal
          visible={isChildrenModal}
          onCancel={toggleChildrenModal}
          data={modelForEdit}
          currentUser={currentUser}
        />
      </div>
    </>
  );
};

export default DonationHistoryPage;
