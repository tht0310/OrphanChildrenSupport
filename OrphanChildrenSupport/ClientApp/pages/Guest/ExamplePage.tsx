import TextEditor from "@Components/shared/TextEditor";
import * as React from "react";
import { RouteComponentProps } from "react-router";

type Props = RouteComponentProps<{}>;

const ExamplePage: React.FC<Props> = () => {
  return <TextEditor />;
};

export default ExamplePage;
