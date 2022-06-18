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
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/lib/upload/interface";
import SupportCategoryService from "@Services/SupportCategoryService";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import ChildrenSupportCategoryService from "@Services/ChildrenSupportCategoryService";
import { IChildrenSupportCategoryModel } from "@Models/IChildrenSupportCategoryModel";
import TextEditor from "@Components/shared/TextEditor";
import { PlusOutlined } from "@ant-design/icons";

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

const ChildrenProfileModal: React.FC<IProps> = ({
  fetchData,
  visible,
  onCancel,
  data,
}: IProps) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageData, setImageData] = useState<any[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [supportCategories, setSupportCategories] = React.useState<
    ISupportCategoryModel[]
  >([]);

  const [deleteStore, setDeleteStore] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (visible === true) {
      setDeleteStore([]);
      form.resetFields();
      if (data) {
        innitialValue();
        getImage(data.id);
      }
    }
  }, [data, visible]);

  React.useEffect(() => {
    fetchSupportCategories();
  }, [visible === true]);

  React.useEffect(() => {
    if (imageData.length > 0) {
      viewImage();
    }
  }, [imageData]);

  React.useEffect(() => {}, [deleteStore.length]);

  const handleCancel = () => {
    handleCancelImage();
    handleCancelImage();
    onCancel();
    form.resetFields();
  };

  const handleCancelImage = () => {
    setPreviewVisible(false);
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

  async function viewImage() {
    imageData.map(async (v) => {
      const imageRes = await childrenProfileService.getImage(Number(v.name));
      if (!imageRes.hasErrors) {
        v.url = imageRes.value.toString();
      }
    });
    setFileList(imageData);
  }

  async function getImage(id: number) {
    const imageRes = await childrenProfileService.getChildrenImage(id);
    const imageData = imageRes.value.items;
    let uid = -1;
    let storeData = [];
    imageData.map(async (m) => {
      const value = {
        url: "",
        name: m.id.toString(),
        uid: uid.toString(),
      };
      uid += 1;
      storeData.push(value);
    });
    setImageData(storeData);
  }

  async function onFinish(values: IChildrenProfileModel | any) {
    values.detailAddress =
      values.city + "-" + values.province + "-" + values.houseNumber;
    values.publicAddress = values.city + "-" + values.province;
    if (data) {
      const tempList = [];
      if (values.childrenCategoryGroup) {
        values.childrenCategoryGroup.map((v) => {
          tempList.push({
            supportCategoryId: v,
            childrenProfileId: values.id,
          });
        });
        values.childrenProfileSupportCategories = tempList;
      }
      const res = await childrenProfileService.update(values);

      if (deleteStore.length > 0) {
        deleteStore.map(async (v) => {
          const res = await childrenProfileService.deleteImage(v);
        });
      }

      if (fileList.length > 0) {
        const tempFile = [];
        fileList.map((f) => {
          if (f.originFileObj) {
            tempFile.push(f.originFileObj);
          }
        });
        await childrenProfileService.addChildrenProfileImages(
          values.id,
          tempFile
        );
      }

      if (!res.hasErrors) {
        message.success(`${values.fullName} has been successfully updated`);
        onCancel();
        fetchData();
      }
    } else {
      const res = await childrenProfileService.add(values);
      if (!res.hasErrors) {
        if (values.childrenCategoryGroup) {
          const tempList = [];
          values.childrenCategoryGroup.map((v) => {
            tempList.push({
              supportCategoryId: v,
              childrenProfileId: res.value.id,
            });
          });
          values.childrenProfileSupportCategories = tempList;
        }
        const images = [];

        fileList.map((v) => images.push(v.originFileObj));

        if (fileList.length > 0) {
          let imageRes = await childrenProfileService.addChildrenProfileImages(
            res.value.id,
            images
          );

          if (!imageRes?.hasErrors) {
            message.success(`${values.fullName} has been successfully added`);
            onCancel();
            fetchData();
          } else {
            message.error(`An error occured`);
          }
        } else {
          message.success(`${values.fullName} has been successfully added`);
          onCancel();
          fetchData();
        }
      }
    }
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  function handleDelete(value) {
    let tempImage: any[] = [];
    tempImage = deleteStore;
    const index = deleteStore.findIndex((item) => item === Number(value.name));
    console.log(index);
    if (index === -1) {
      tempImage.push(Number(value.name));
      setDeleteStore(tempImage);
    }
  }

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  function innitialValue() {
    form.setFieldsValue({
      id: data.id,
      fullName: data.fullName,
      gender: data.gender ? "true" : "false",
      dob: moment(data.dob),
      city: data.detailAddress.split("-")[0],
      province: data.detailAddress.split("-")[1],
      houseNumber: data.detailAddress.split("-")[2],
      circumstance: data.circumstance,
      status: data.status + "",
      guardianPhoneNumber: data.guardianPhoneNumber,
      guardianName: data.guardianName,
    });
    if (data.childrenProfileSupportCategories) {
      const tempList = [];
      data.childrenProfileSupportCategories.map((v) => {
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
      style={{ top: 20, height: "300px" }}
      bodyStyle={{
        overflowY: "scroll",
        height: "calc(100vh - 105px)",
        marginLeft: "19px",
      }}
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
          <Col span={7}>
            <div className="image-uploading">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleDelete}
              >
                {fileList.length >= 4 ? null : uploadButton}
              </Upload>

              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancelImage}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </div>
          </Col>
          <Col span={17}>
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
              name="circumstance"
              label="Circumstance"
              className="label-custom"
              {...inlineFormLayout}
            >
              {/* <TextArea rows={3} style={{ width: "100%" }} /> */}
              <TextEditor />
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
                      <Col span={8}>
                        <Checkbox
                          value={s.id}
                          style={{ lineHeight: "32px", paddingRight: "20px" }}
                        >
                          {s.title}
                        </Checkbox>
                      </Col>
                    );
                  })}
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              {...inlineFormLayout}
              style={{ marginTop: "30px" }}
              rules={[{ required: true, message: "Please enter status." }]}
            >
              <Select>
                <Select.Option value="0" key="1">
                  Waiting for support
                </Select.Option>
                <Select.Option value="1" key="0">
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
