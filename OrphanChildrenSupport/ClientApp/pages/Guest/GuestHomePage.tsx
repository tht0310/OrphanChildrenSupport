import * as React from "react";
import { RouteComponentProps } from "react-router";
import Page1 from "./Page1";
import Page2 from "./Page2";

import InformationSection2 from "./Section1";
import Slider from "@Components/shared/Guest/Slider";
import Section from "@Components/shared/Guest/Section";
import Page3 from "./Page3";
import Section1 from "./Section1";
import Section2 from "@Components/shared/Guest/Section2";
import ChildrenBlock from "./ChildrenBlock";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import TextEditor from "@Components/shared/TextEditor";

type Props = RouteComponentProps<{}>;

const childrenProfileService = new ChildrenProfileService();

const GuestHomePage: React.FC<Props> = () => {
  React.useEffect(() => {
    fetchChildrenProfile();
  }, []);

  const [childrenProfiles, setChildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);

  async function fetchChildrenProfile() {
    const dataRes = await childrenProfileService.getAll({ pageSize: 6 });
    if (!dataRes.hasErrors) {
      setChildrenProfiles(dataRes.value.items);
    }
  }
  return (
    <div>
      <Slider />
      <Section />
      <Page3 />
      <Page2 />
      <Section1 />
      {/* <Section1 /> */}
      <Section2 />
      <ChildrenBlock
        title={"Children"}
        subTitle={"Have special circumstances"}
        children={childrenProfiles}
      />
      <ChildrenBlock
        title={"Children"}
        children={childrenProfiles}
        subTitle={"Need support school things"}
      />
      <ChildrenBlock
        title={"Children"}
        children={childrenProfiles}
        subTitle={"Need support food"}
      />
      <Page1 />
    </div>
  );
};

export default GuestHomePage;
