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
  const [specialChildren, setSpecialChildren] = React.useState<
    IChildrenProfileModel[]
  >([]);
  const [foodChildren, setFoodChildren] = React.useState<
    IChildrenProfileModel[]
  >([]);

  const [schoolChildren, setSchoolChildren] = React.useState<
    IChildrenProfileModel[]
  >([]);

  React.useEffect(() => {
    fetchSpecialChildren();
    fetchSchoolChildren();
    fetchChildrenNeedFood();
  }, []);

  async function getImage(id: number) {
    const imageRes = await childrenProfileService.getChildrenImage(id);
    const imageData = imageRes.value.items;
    if (imageData.length > 0) {
      return imageData[0].id;
    } else {
      return -1;
    }
  }

  async function fetchChildrenNeedFood() {
    const dataRes = await childrenProfileService.getAll({
      supportCategoryId: 1,
    });
    if (!dataRes.hasErrors) {
      const tempValue = dataRes.value.items;
      for (let index = 0; index < tempValue.length; index++) {
        let tempId = await getImage(tempValue[index].id);
        tempValue[index].imageId = tempId;
      }
      setFoodChildren(tempValue);
    }
  }

  async function fetchSpecialChildren() {
    const dataRes = await childrenProfileService.getAll({
      supportCategoryId: 4,
    });
    if (!dataRes.hasErrors) {
      const tempValue = dataRes.value.items;
      for (let index = 0; index < tempValue.length; index++) {
        let tempId = await getImage(tempValue[index].id);
        tempValue[index].imageId = tempId;
      }
      setSpecialChildren(tempValue);
    }
  }

  async function fetchSchoolChildren() {
    const dataRes = await childrenProfileService.getAll({
      supportCategoryId: 2,
    });
    if (!dataRes.hasErrors) {
      const tempValue = dataRes.value.items;
      for (let index = 0; index < tempValue.length; index++) {
        let tempId = await getImage(tempValue[index].id);
        tempValue[index].imageId = tempId;
      }
      setSchoolChildren(tempValue);
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
        children={specialChildren}
      />
      <ChildrenBlock
        title={"Children"}
        children={schoolChildren}
        subTitle={"Need support school things"}
      />
      <ChildrenBlock
        title={"Children"}
        children={foodChildren}
        subTitle={"Need support food"}
      />
      <Page1 />
    </div>
  );
};

export default GuestHomePage;
