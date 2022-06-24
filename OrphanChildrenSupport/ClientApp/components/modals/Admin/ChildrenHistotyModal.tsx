import React, { useState } from "react";
import { Form, Drawer, Table, Space } from "antd";
import { IDonationDetailModel } from "@Models/IDonationModel";
import DonationService from "@Services/DonationService";
import SupportCategoryService from "@Services/SupportCategoryService";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import { CustomColumnType } from "@Components/forms/Table";
import AccountService from "@Services/AccountService";
import { IRegisterModel } from "@Models/ILoginModel";

export interface IProps {
  visible?: boolean;
  onCancel?: () => void;
  childrenId?: number;
}

const donationService = new DonationService();
const supportCategoriesService = new SupportCategoryService();
const userService = new AccountService();

const ChildrenHistoryDrawer: React.FC<IProps> = ({
  visible,
  onCancel,
  childrenId,
}: IProps) => {
  const [form] = Form.useForm();
  const [donationDetails, setDonationDetails] =
    React.useState<IDonationDetailModel[]>();
  const [supportCategories, setSupportCategories] = React.useState<
    ISupportCategoryModel[]
  >([]);
  const [user, setUser] = React.useState<IRegisterModel[]>([]);

  React.useEffect(() => {
    if (visible == true && childrenId) {
      fetchSupportCategories();
      fetchUsers();
      fetChDonationDetail();
    }
  }, [visible, childrenId]);

  function handleCancel() {
    onCancel();
  }

  async function fetchUsers() {
    const res = await userService.getAll();
    if (!res.hasErrors) {
      setUser(res.value.items);
    }
  }

  async function fetChDonationDetail() {
    const temp = [];
    const res = await donationService.getAll({ childrenProfileId: childrenId });
    const result = res.value.items;
    result.map((v) => {
      if (v.status === 2) {
        v.donationDetails.map((v1) => {
          if (v1.status === 2) {
            const index = user.findIndex((item) => v.accountId === item.id);
            v1.accountName = user[index].fullName;
            temp.push(v1);
          }
        });
      }
    });

    setDonationDetails(temp);
  }

  async function fetchSupportCategories() {
    const dataRes = await supportCategoriesService.getAll();
    if (!dataRes.hasErrors) {
      setSupportCategories(dataRes.value.items);
    }
  }

  function findNamebyId(id: number, list) {
    const index = list.findIndex((item) => id === item.id);
    return index;
  }

  const requestColumns: CustomColumnType[] = [
    {
      title: "#",
      dataIndex: "age",
      key: "age",
      width: "10%",
      align: "center",
      render: (text, row, index) => index + 1,
    },
    {
      title: "Title",
      key: "supportCategoryId",
      dataIndex: "supportCategoryId",
      align: "center",
      width: "35%",
      render: (text, row, index) =>
        findNamebyId(row.supportCategoryId, supportCategories) >= 0
          ? supportCategories[
              findNamebyId(row.supportCategoryId, supportCategories)
            ].title
          : "",
    },
    {
      title: "Supporter",
      key: "accountName",
      dataIndex: "accountName",
      align: "center",
      width: "55%",
    },
  ];

  return (
    <>
      <Drawer
        title={
          <>
            <Space>
              <span>Donation History</span>
              <span>
                ({donationDetails?.length > 0 ? donationDetails?.length : 0})
              </span>
            </Space>
          </>
        }
        visible={visible}
        onClose={handleCancel}
        bodyStyle={{ padding: "10px 25px" }}
      >
        <Table dataSource={donationDetails} columns={requestColumns} />
      </Drawer>
    </>
  );
};

export default ChildrenHistoryDrawer;
