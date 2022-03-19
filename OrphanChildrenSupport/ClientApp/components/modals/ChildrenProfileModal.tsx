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
import SupportCategoryService from "@Services/SupportCategoryService";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import ChildrenSupportCategoryService from "@Services/ChildrenSupportCategoryService";
import { IChildrenSupportCategoryModel } from "@Models/IChildrenSupportCategoryModel";

const { TextArea } = Input;

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  data?: IChildrenProfileModel;
  fetchData: () => void;
}

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

const childrenProfileService = new ChildrenProfileService();
const supportCategoriesService = new SupportCategoryService();
const childrenSupportCategoryService = new ChildrenSupportCategoryService();

const ChildrenProfileModal: React.FC<IProps> = ({
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
  const [supportCategories, setSupportCategories] = React.useState<
    ISupportCategoryModel[]
  >([]);

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

  React.useEffect(() => {
    fetchSupportCategories();
  }, [visible === true]);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  async function fetchSupportCategories() {
    const dataRes = await supportCategoriesService.getAll();
    if (!dataRes.hasErrors) {
      setSupportCategories(dataRes.value.items);
    }
  }

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

  async function onFinish(values: IChildrenProfileModel | any) {
    //Prepare value
    values.detailAddress =
      values.city + "-" + values.province + "-" + values.houseNumber;
    values.publicAddress = values.city + "-" + values.province;
    if (data) {
      const tempList = [];
      // if (values.childrenCategoryGroup) {
      //   values.childrenCategoryGroup.map((v) => {
      //     tempList.push({
      //       supportCategoryId: v,
      //       childrenProfileId: values.id,
      //     });
      //   });
      //   values.childrenSupportCategories = [];
      // }

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
        if (values.childrenCategoryGroup) {
          values.childrenCategoryGroup.map((v) => {
            childrenSupportCategoryService.addChildrenCategory({
              supportCategoryId: v,
              childrenProfileId: res.value.id,
            });
          });
        }

        message.success("Thêm mới thành công");
        onCancel();
        fetchData();
      }
    }
  }

  function innitialValue() {
    form.setFieldsValue({
      id: data.id,
      fullName: data.fullName,
      gender: data.gender ? "true" : "false",
      dob: moment(data.dob),
      city: data.detailAddress.split("-")[0],
      province: data.detailAddress.split("-")[1],
      houseNumber: data.detailAddress.split("-")[2],
      description: data.description,
      circumstance: data.circumstance,
      guardianPhoneNumber: data.guardianPhoneNumber,
      guardianName: data.guardianName,
    });
    if (data.childrenSupportCategories) {
      const tempList = [];
      data.childrenSupportCategories.map((v) => {
        tempList.push(v.supportCategoryId);
      });
      form.setFieldsValue({ childrenCategoryGroup: tempList });
    }
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
            <Form.Item
              name="fullName"
              label="Full name"
              className="label-custom"
              {...inlineFormLayout}
              rules={[{ required: true, message: "Please enter full name." }]}
            >
              <Input />
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
              {...inlineFormLayout}
              label="Address"
              style={{ marginBottom: "8px" }}
              required
            >
              <Form.Item
                name="city"
                style={{ display: "inline-block", width: "25%" }}
                rules={[{ required: true, message: "Please enter city" }]}
              >
                <Input placeholder="Enter city" />
              </Form.Item>
              <Form.Item
                name="province"
                rules={[{ required: true, message: "Please enter province ." }]}
                style={{
                  display: "inline-block",
                  width: "25%",
                }}
              >
                <Input placeholder="Enter province" />
              </Form.Item>
              <Form.Item
                name="houseNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter street name, house number...",
                  },
                ]}
                style={{
                  display: "inline-block",
                  width: "50%",
                }}
              >
                <Input placeholder="Enter street name, house number..." />
              </Form.Item>
            </Form.Item>
            <Row>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Guardian Name"
                  name="guardianName"
                  {...inlineCol2FormLayout}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Guardian Phone"
                  name="guardianPhoneNumber"
                  {...inlineCol2FormLayout}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="Description"
              className="label-custom"
              {...inlineFormLayout}
            >
              <TextArea rows={3} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="childrenCategoryGroup"
              {...inlineFormLayout}
              label="Need support"
            >
              <Checkbox.Group>
                <Row>
                  {supportCategories.map((s) => {
                    return (
                      <Col span={6}>
                        <Checkbox value={s.id} style={{ lineHeight: "32px" }}>
                          {s.title}
                        </Checkbox>
                      </Col>
                    );
                  })}
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label="Circumstance"
              name="circumstance"
              {...inlineFormLayout}
              style={{ marginTop: "30px" }}
              rules={[
                { required: true, message: "Please enter circumstance." },
              ]}
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

export default ChildrenProfileModal;
