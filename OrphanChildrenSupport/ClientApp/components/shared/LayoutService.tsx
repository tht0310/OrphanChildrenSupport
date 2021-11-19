import {
  PlusCircle,
  Clipboard,
  Archive,
  Coffee,
  CheckCircle,
  XCircle,
  Share2,
  Grid,
  PieChart,
  Package,
  Slash,
  List,
  Home,
  FileText,
} from "react-feather";
import {
  PeopleFill,
  PersonLinesFill,
  PersonCircle,
  EnvelopeFill,
  Diagram3,
} from "react-bootstrap-icons";

import React from "react";
import { MenuModel } from "@Models/IMenuModel";

export const getMenus = (name: string) => {
  if (name === "") {
    name = "workflow";
  }
  let menus: MenuModel[] = [];
  switch (name) {
    case "admin": {
      menus = [
        {
          id: "0",
          title: "Trang chủ",
          icon: <Home />,
          url: "/admin",
        },
        {
          id: "workflowdesign",
          title: "Thiết kế quy trình",
          icon: <Grid />,
          children: [
            {
              id: "workflows",
              title: "Quy trình động",
              icon: <Diagram3 />,
              url: "/admin/workflowdesign/workflows",
            },
            {
              id: "workflowsDetail",
              title: "Quy trình chi tiết",
              icon: <Diagram3 />,
              url: "/admin/workflowdesign/workflowsDetail",
            },
            {
              id: "mailtemplates",
              title: "Biểu mẫu mail",
              icon: <EnvelopeFill />,
              url: "/admin/workflowdesign/mailtemplates",
            },
            {
              id: "documentTypes",
              title: "Định nghĩa loại tài liệu",
              icon: <Diagram3 />,
              url: "/admin/workflowdesign/documentTypes",
            },
            {
              id: "createworkflow_6",
              title: "Cấu hình by Pass",
              icon: <Diagram3 />,
              url: "/admin/workflowdesign",
            },
            {
              id: "workflowCategory",
              title: "Cấu hình loại quy trình",
              icon: <Diagram3 />,
              url: "/admin/workflowdesign/workflowCategory",
            },
            {
              id: "workingtimes",
              title: "Cấu hình thời gian làm việc",
              icon: <Diagram3 />,
              url: "/admin/workflowdesign/workingtimes",
            },
            {
              id: "workweek",
              title: "Cấu hình tuần làm việc",
              icon: <Diagram3 />,
              url: "/admin/workflowdesign/workweek",
            },
          ],
        },

        {
          id: "categories",
          icon: <List />,
          title: "Danh mục",
          children: [
            {
              id: "department",
              title: "Đơn vị",
              icon: <PeopleFill />,
              url: "/admin/categories/department",
            },
            {
              id: "personalprofile",
              title: "Nhân viên",
              icon: <PeopleFill />,
              url: "/admin/categories/personalProfile",
            },
            {
              id: "position",
              title: "Chức vụ",
              icon: <PersonLinesFill />,
              url: "/admin/categories/position",
            },
            {
              id: "supportcontacts",
              title: "Support",
              icon: <PersonCircle />,
              url: "/admin/categories/supportContacts",
            },
          ],
        },
      ];

      break;
    }

    case "workflow": {
      menus = [
        {
          id: "0",
          title: "Dashboard",
          icon: <PieChart />,
          url: "/workflow",
        },
        {
          id: "createworkflow",
          title: "Tạo mới yêu cầu",
          icon: <PlusCircle />,
          url: "/workflow/createworkflow",
        },
        {
          id: "myworkflow",
          title: "Yêu cầu của tôi",
          icon: <Clipboard />,
          children: [
            {
              id: "myworkflowdraft",
              title: "Đang lưu",
              url: "/workflow/myworkflow/myworkflowdraft",
              icon: <Archive />,
            },
            {
              id: "myworkflowpending",
              title: "Chờ phê duyệt",
              url: "/workflow/myworkflow/myworkflowpending",
              icon: <Coffee />,
            },
            {
              id: "myworkflowapproved",
              title: "Đã phê duyệt",
              url: "/workflow/myworkflow/myworkflowapproved",
              icon: <CheckCircle />,
            },
            {
              id: "myworkflowreturn",
              title: "Không phê duyệt",
              url: "/workflow/myworkflow/myworkflowreturn",
              icon: <XCircle />,
            },
            {
              id: "myworkflowshared",
              title: "Đã chia sẻ",
              url: "/workflow/myworkflow/myworkflowshared",
              icon: <Share2 />,
            },
            {
              id: "myworkflowishared",
              title: "Được chia sẻ",
              url: "/workflow/myworkflow/myworkflowishared",
              icon: <Share2 />,
            },
            {
              id: "myworkflowall",
              title: "Tất cả",
              url: "/workflow/myworkflow/myworkflowall",
              icon: <Grid />,
            },
          ],
        },
        {
          id: "approve",
          title: "Phê duyệt",
          icon: <CheckCircle />,
          children: [
            {
              id: "workflow-tasks",
              title: "Chờ phê duyệt",
              icon: <Coffee />,
              url: "/workflow/approve/workflow-tasks",
            },
            {
              id: "workflowpending",
              title: "Đã xử lý",
              icon: <Package />,
              url: "/workflow/approve/workflowpending",
            },
            {
              id: "workflowreturn",
              title: "Không được phê duyệt",
              icon: <Slash />,
              url: "/workflow/approve/workflowreturn",
            },
            {
              id: "workflowapproved",
              title: "Đã hoàn tất",
              icon: <CheckCircle />,
              url: "/workflow/approve/workflowapproved",
            },
            {
              id: "search",
              title: "Tất cả",
              icon: <Grid />,
              url: "/workflow/approve/search",
            },
          ],
        },
        {
          id: "report",
          title: "Báo cáo",
          icon: <FileText />,
          children: [
            {
              id: "processmonitoring",
              title: "Giám sát quy trình",
              icon: <PieChart />,
              url: "/workflow/report/processmonitoring",
            },
            {
              id: "processing",
              title: "Báo cáo xử lý",
              icon: <FileText />,
              url: "/workflow/report/processingreport",
            },
            {
              id: "processingprogess",
              title: "Báo cáo quá trình xử lý",
              icon: <FileText />,
              url: "/workflow/report/processingprogessreport",
            },
            {
              id: "leave",
              title: "Báo cáo đơn xin nghỉ phép",
              icon: <FileText />,
              url: "/workflow/report/leavereport",
            },
            {
              id: "leaveinstead",
              title: "Báo cáo đơn xin nghỉ phép nộp thay",
              icon: <FileText />,
              url: "/workflow/report/leaveinsteadreport",
            },
            {
              id: "paymentorder",
              title: "Báo cáo đề nghị thanh toán",
              icon: <FileText />,
              url: "/workflow/report/paymentorder",
            },
            {
              id: "kpiminuspoint",
              title: "Báo cáo ghi nhận điểm trừ KPI_TGĐ",
              icon: <FileText />,
              url: "/workflow/report/kpiminuspoint",
            },
            {
              id: "completionrate",
              title: "Báo cáo tỉ lệ hoàn thành",
              icon: <FileText />,
              url: "/workflow/report/completionrate",
            },
            {
              id: "processingprogessa2",
              title: "Báo cáo quá trình xử lý A2",
              icon: <FileText />,
              url: "/workflow/report/processingprogessa2",
            },
          ],
        },
      ];
      break;
    }

    default:
      break;
  }
  return menus;
};
