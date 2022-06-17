import * as React from "react";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Upload,
} from "antd";

import { IReportFieldModel } from "@Models/IReportFieldModel";
import { IReportDetailModel } from "@Models/IReportModel";
import moment from "moment";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { ArrowRightOutlined } from "@ant-design/icons";
import TextEditor from "@Components/shared/TextEditor";
import { IDonationDetailModel, IDonationModel } from "@Models/IDonationModel";
import { displayDateTime } from "@Services/FormatDateTimeService";
import { DataServices } from "@Services/DataServices";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { Plus } from "react-feather";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import SupportCategoryService from "@Services/SupportCategoryService";
import AccountService from "@Services/AccountService";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { IRegisterModel } from "@Models/ILoginModel";
import DonationDetailService from "@Services/DonationDetailService";

const supportCategoriesService = new SupportCategoryService();
const userService = new AccountService();
const childrenService = new ChildrenProfileService();
const donationService = new DonationDetailService();

const inlineCol2FormLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

const inlineFormLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 19,
  },
};

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  data: IDonationDetailModel;
  donation: IDonationModel;
  fetchDonation: () => void;
}

const DonationDetailModal: React.FC<IProps> = ({
  visible,
  data,
  onCancel,
  donation,
  fetchDonation,
}: IProps) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = React.useState<string | null>();
  const [imageFile, setImageFile] = React.useState<UploadFile<any>>();
  const [supportCategories, setSupportCategories] = React.useState<
    ISupportCategoryModel[]
  >([]);
  const [children, setChildren] = React.useState<IChildrenProfileModel[]>([]);
  const [user, setUser] = React.useState<IRegisterModel[]>([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    if (visible) {
      form.resetFields();
      if (data) {
        innitialValue();
      }
    }
  }, [data, visible]);

  async function fetchData() {
    fetchSupportCategories();
    fetchUsers();
    fetchChildren();
  }

  async function fetchSupportCategories() {
    const res = await supportCategoriesService.getAll();
    if (!res.hasErrors) {
      setSupportCategories(res.value.items);
    }
  }

  async function fetchUsers() {
    const res = await userService.getAll();
    if (!res.hasErrors) {
      setUser(res.value.items);
    }
  }

  async function fetchChildren() {
    const res = await childrenService.getAll();
    if (!res.hasErrors) {
      setChildren(res.value.items);
    }
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function innitialValue() {
    form.setFieldsValue({
      id: data.id,
      supportCategoryId: data.supportCategoryId,
      childrenProfileId: donation?.childrenProfileId,
      accountId: donation?.accountId,
      donationDetailStatus: data?.donationDetailStatus,
      note: data?.note,
      donationId: donation?.id,
    });
  }

  const handleChangeImage = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrlT: string) => {
        setImageUrl(imageUrlT);
        setImageFile(info.file);
      });
    }
  };

  async function onFinish(value) {
    const res = await donationService.update(value);
    if (!res.hasErrors) {
      onCancel();
      fetchDonation();
    }
  }

  function onSubmit() {
    form.submit();
  }

  async function handleCancel() {
    onCancel();
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose={true}
      title={"Edit donation detail"}
      footer={null}
      width={900}
      style={{ top: 30, height: "300px" }}
      bodyStyle={{
        overflowY: "scroll",
        height: "calc(100vh - 150px)",
        marginLeft: "19px",
      }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
      >
        <Form.Item name="id" label="Id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item name="donationId" label="Id" hidden={true}>
          <Input />
        </Form.Item>

        <Row>
          <Col span={6}>
            <Upload
              customRequest={DataServices.uploadFileRequest}
              onChange={(info: any) => handleChangeImage(info)}
              className="avatar-uploader"
              listType="picture-card"
              showUploadList={false}
              accept=".jpg, .png, .JPEG"
              style={{ width: "100%" }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  className="icon-upload"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  <Plus />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Col>
          <Col span={18}>
            <Form.Item
              style={{ width: "100%" }}
              name="supportCategoryId"
              label="Support "
              className="label-custom"
              {...inlineFormLayout}
              rules={[{ required: true, message: "Please enter full name." }]}
            >
              <Select style={{ width: "100%" }}>
                {supportCategories.map((s) => {
                  return <Select.Option value={s.id}>{s.title}</Select.Option>;
                })}
              </Select>
            </Form.Item>
            <Row>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Supporter"
                  name="accountId"
                  {...inlineCol2FormLayout}
                >
                  <Select showSearch style={{ width: "100%" }} disabled>
                    {user.map((s) => {
                      return (
                        <Select.Option value={s.id}>{s.fullName}</Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Children"
                  name="childrenProfileId"
                  {...inlineCol2FormLayout}
                >
                  <Select showSearch style={{ width: "100%" }} disabled>
                    {children.map((s) => {
                      return (
                        <Select.Option value={s.id}>{s.fullName}</Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Status"
              name="donationDetailStatus"
              {...inlineFormLayout}
              rules={[{ required: true, message: "Please enter status." }]}
            >
              <Select>
                <Select.Option value={0} key="0">
                  Waiting for approval
                </Select.Option>
                <Select.Option value={1} key="1">
                  Supported
                </Select.Option>
                <Select.Option value={2} key="2">
                  Rejected
                </Select.Option>
                <Select.Option value={3} key="3">
                  Canceled
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Note"
              name="note"
              {...inlineFormLayout}
              rules={[{ required: true, message: "Please enter status." }]}
            >
              <Input />
            </Form.Item>

            {data && (
              <>
                <Row>
                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Create by"
                      name="createdBy"
                      {...inlineCol2FormLayout}
                    >
                      <Input disabled defaultValue={data.createdBy} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Created time"
                      name="createdTime"
                      {...inlineCol2FormLayout}
                    >
                      <Input
                        disabled
                        defaultValue={
                          data.createdTime
                            ? displayDateTime(data.createdTime)
                            : ""
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Last Modified"
                      name="lastModified"
                      {...inlineCol2FormLayout}
                    >
                      <Input
                        disabled
                        defaultValue={
                          data.lastModified
                            ? displayDateTime(data.lastModified)
                            : ""
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Modified By"
                      name="modifiedBy"
                      {...inlineCol2FormLayout}
                    >
                      <Input disabled defaultValue={data.modifiedBy} />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>

        <div className="modal-actions">
          <Button
            type="text"
            //icon={<Save color={"#72bf42"} size={22} />}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default DonationDetailModal;
