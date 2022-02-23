import { CContainer } from "@coreui/react";
import React, { FC } from "react";
import Dashboard from "../../pages/Dashboard";

// routes config
interface Props {
  children?: React.ReactNode;
}

const Content: FC<Props> = ({ children }) => {
  return <CContainer lg>{children}</CContainer>;
};

export default React.memo(Content);
