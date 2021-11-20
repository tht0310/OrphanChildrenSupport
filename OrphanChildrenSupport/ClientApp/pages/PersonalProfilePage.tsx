import Table, { CustomColumnType } from "@Components/forms/Table";
import AddPersonalProfileModal from "@Components/modals/AddPersonalProfileModal";
import { IPersonalProfileModel } from "@Models/IPersonalProfileModel";
import PersonalProfileService from "@Services/PersonalProfileService";
import PersonService from "@Services/PersonService";

import * as React from "react";
import { useEffect } from "react";
import { Plus, UserPlus } from "react-feather";

type Props = {};

const personalProfileService = new PersonalProfileService();

const PersonalProfilePage: React.FC<Props> = () => {
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [personalProfiles, setpersonalProfiles] = React.useState<
    IPersonalProfileModel[]
  >([]);
  const [isAddPersonModal, setAddPersonModal] = React.useState<boolean>(false);

  useEffect(() => {
    document.title = "Dashboard - Quy trình";
    fetchData();
  }, []);

  // const tempData: IPersonalProfileModel[] = [
  //   {
  //     accountName: "tht0310",
  //     fullName: "Tran Hoang Tien",
  //     gender: true,
  //     birthDay: null,
  //     address: "",
  //     mobile: "0373831808",
  //     email: "thtien0310@gmail.com",
  //     id: 2,
  //     createdBy: "",
  //     createdTime: "2021-07-13T02:12:06.4666667",
  //     lastModified: null,
  //     modifiedBy: null,
  //     isDeleted: false,
  //   },
  // ];
  const requestColumns: CustomColumnType[] = [
    {
      title: "STT",
      ellipsis: true,
      width: "5%",
      align: "center",
      render: (text, row, index) => index + 1 + (page - 1) * pageSize,
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      ellipsis: true,
      width: "15%",
      columnSearchDataIndex: "fullName",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      width: "8%",
      key: "gender",
      columnSearchDataIndex: "gender",
      render: (text, row, index) => (text ? "Nam" : "Nữ"),
    },

    {
      title: "Ngày sinh",
      dataIndex: "birthDay",
      key: "birthDay",
      width: "10%",
      columnSearchDataIndex: "birthDay",
    },
    {
      title: "Tài khoản",
      columnSearchDataIndex: "accountName",
      dataIndex: "accountName",
      width: "12%",
      key: "accountName",
    },
    {
      title: "Email",
      columnSearchDataIndex: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Điện thoại",
      columnSearchDataIndex: "phone",
      dataIndex: "phone",
      width: "10%",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      columnSearchDataIndex: "address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "",
      columnSearchDataIndex: "address",
      dataIndex: "address",
      key: "address",
    },
  ];

  async function fetchData() {
    fetchPersonalProfile();
  }

  async function toggleAddPersonModal() {
    setAddPersonModal(!isAddPersonModal);
  }

  async function fetchPersonalProfile() {
    const dataRes = await personalProfileService.getAll();

    if (!dataRes.hasErrors) {
      setpersonalProfiles(dataRes.value.items);
    }
    // const ssd = new PersonService();
    // const dataa = await ssd.search();
    // console.log(dataa);
    // if (!dataRes.hasErrors) {
    //   setpersonalProfiles(dataRes.value.items);
    // }
  }

  return (
    <div>
      <h4 className="title-common">Thông tin cá nhân</h4>
      <div className="option-panel">
        <div className="add" onClick={() => toggleAddPersonModal()}>
          <UserPlus size={25} color="#1890ff" /> Thêm mới
        </div>
      </div>
      <Table columns={requestColumns} dataSource={personalProfiles} />
      <AddPersonalProfileModal
        visible={isAddPersonModal}
        onCancel={toggleAddPersonModal}
      />
    </div>
  );
};

export default PersonalProfilePage;
