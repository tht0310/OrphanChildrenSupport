import * as React from "react";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import { Plus, Save } from "react-feather";

import moment from "moment";
import { displayDate, displayDateTime } from "@Services/FormatDateTimeService";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { DataServices } from "@Services/DataServices";
import { useState } from "react";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";

const { TextArea } = Input;

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  data?: IChildrenProfileModel;
  fetchData: () => void;
}

const inlineCol2FormLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const inlineFormLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 19,
  },
};

const childrenProfileService = new ChildrenProfileService();

const childrenProfileModal: React.FC<IProps> = ({
  fetchData,
  visible,
  onCancel,
  data,
}: IProps) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [imageFile, setImageFile] = useState<UploadFile<any>>();
  const [imageUrlTmp, setImageUrlTmp] = useState<string>();
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  React.useEffect(() => {
    if (visible) {
      form.resetFields();
      if (data) {
        innitialValue();
      }
    }
  }, [data, visible]);

  React.useEffect(() => {
    if (data) {
      getImage(data.id);
    }
  }, [data]);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  function onSubmit() {
    form.submit();
  }

  async function getImage(id) {
    const avatarUrl = await childrenProfileService.getImage(id);
    if (!avatarUrl.hasErrors) {
      setImageUrl(avatarUrl.value.toString());
    } else {
      setImageUrl(null);
    }
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChangeImage = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "uploading") {
      setIsUploadingImage(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrlT: string) => {
        setImageUrl(imageUrlT);
        setImageFile(info.file);
        setIsUploadingImage(false);
      });
    }
  };
  const uploadButton = (
    <div>
      <Plus />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  async function onFinish(values: IChildrenProfileModel) {
    if (data) {
      const res = await childrenProfileService.updateWithFile(
        values,
        imageFile?.originFileObj
      );
      if (!res.hasErrors) {
        message.success("Cập nhật thành công");
        onCancel();
        fetchData();
      }
    } else {
      const res = await childrenProfileService.addWithFile(
        values,
        imageFile?.originFileObj
      );
      if (!res.hasErrors) {
        message.success("Thêm mới thành công");
        onCancel();
        fetchData();
      }
    }
  }

  function innitialValue() {
    form.setFieldsValue({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName,
      gender: data.gender ? "true" : "false",
      dob: moment(data.dob),
      address: data.address,
      description: data.description,
      isNeedToBeAdopted: data.isNeedToBeAdopted,
      phoneNumber: data.phoneNumber,
      status: data.status,
    });
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose={true}
      title={data ? "Edit children" : "Add new children"}
      footer={null}
      width={1000}
      className="antd-modal-custom"
      style={{ top: 10, height: "300px" }}
      bodyStyle={{ overflowY: "scroll", height: "calc(100vh - 90px)" }}
    >
      <Form
        form={form}
        style={{ padding: "20px 0" }}
        onFinish={onFinish}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
      >
        <Form.Item name="id" label="Id" hidden={true}>
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
                uploadButton
              )}
            </Upload>
          </Col>
          <Col span={18}>
            <Form.Item label="Name" style={{ marginBottom: 0 }} required>
              <Form.Item
                name="firstName"
                style={{ display: "inline-block", width: "calc(32.05% - 8px)" }}
                rules={[
                  { required: true, message: "Please enter first name." },
                ]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Please enter last name." }]}
                style={{
                  display: "inline-block",
                  width: "calc(32.05% - 8px)",
                  margin: "0 8px",
                }}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
              <Form.Item
                name="middleName"
                rules={[
                  { required: true, message: "Please enter middle name." },
                ]}
                style={{
                  display: "inline-block",
                  width: "calc(32.05% - 8px)",
                }}
              >
                <Input placeholder="Enter middle name" />
              </Form.Item>
            </Form.Item>
            <Row>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Birthday"
                  name="dob"
                  {...inlineCol2FormLayout}
                  rules={[
                    { required: true, message: "Please enter birthday." },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Gender"
                  name="gender"
                  {...inlineCol2FormLayout}
                  rules={[{ required: true, message: "Please enter gender." }]}
                >
                  <Select>
                    <Select.Option value="false" key="1">
                      Girl
                    </Select.Option>
                    <Select.Option value="true" key="0">
                      Boy
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="phoneNumber"
              label="Phone"
              className="label-custom"
              {...inlineFormLayout}
              rules={[{ required: true, message: "Please enter phone." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              className="label-custom"
              {...inlineFormLayout}
              rules={[{ required: true, message: "Please enter address." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              className="label-custom"
              {...inlineFormLayout}
            >
              <TextArea rows={3} style={{ width: "100%" }} />
            </Form.Item>
            <Row>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Status"
                  name="status"
                  {...inlineCol2FormLayout}
                  rules={[{ required: true, message: "Please enter status." }]}
                >
                  <Select>
                    <Select.Option value="Waiting for support" key="1">
                      Waiting for support
                    </Select.Option>
                    <Select.Option value="Supported" key="0">
                      Supported
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Need adopted"
                  name="isNeedToBeAdopted"
                  {...inlineCol2FormLayout}
                >
                  <Checkbox
                    checked={data?.isNeedToBeAdopted}
                    style={{ lineHeight: "32px", marginLeft: "20px" }}
                    onChange={(e) => {
                      form.setFieldsValue({
                        isNeedToBeAdopted: !data.isNeedToBeAdopted,
                      });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
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

export default childrenProfileModal;
