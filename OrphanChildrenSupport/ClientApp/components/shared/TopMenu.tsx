import React, { FC } from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from "@coreui/icons";
import { Avatar, Badge } from "antd";
import {
  BellOutlined,
  MailOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";

interface Props extends RouteComponentProps {
  isCollapsed: boolean;
  toggle: () => void;
}

const TopMenu: FC<Props> = ({ isCollapsed = false, toggle }: Props) => {
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler className="ps-1" onClick={() => toggle()}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/admin/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#" className="nav-item-2">
              <Badge count={1}>
                <BellOutlined
                  style={{
                    fontSize: "130%",
                    color: "rgba(44, 56, 74, 0.681)",
                    marginRight: "2px",
                  }}
                />
              </Badge>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#" className="nav-item-2">
              <Badge count={4}>
                <MailOutlined
                  style={{
                    fontSize: "130%",
                    color: "rgba(44, 56, 74, 0.681)",
                    marginRight: "2px",
                  }}
                />
              </Badge>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#" className="avartar">
              <Avatar style={{ backgroundColor: "#f56a00" }}>N</Avatar>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default withRouter(TopMenu);
