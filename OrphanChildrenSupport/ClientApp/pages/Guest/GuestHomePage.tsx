import * as React from "react";
import { RouteComponentProps } from "react-router";

import Slider from "@Components/shared/Guest/Slider";
import Section from "@Components/shared/Section/Section";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import Section2 from "@Components/shared/Section/Section2";
import Section1 from "@Components/shared/Section/Section1";
import Section5 from "@Components/shared/Section/Section5";
import Section4 from "@Components/shared/Section/Section4";
import Section3 from "@Components/shared/Section/Section3";
import ChildrenBlock from "@Components/shared/Section/ChildrenBlock";

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
    document.title = "Home | FOR THE CHILDREN";
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

  async function fetchSpecialChildren() {
    const dataRes = await childrenProfileService.getAll({
      supportCategoryId: 6,
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

  async function fetchSchoolChildren() {
    const dataRes = await childrenProfileService.getAll({
      supportCategoryId: 4,
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
      <Section5 />
      {/* <Section4 /> */}
      <Section1 />
      <Section2 />
      <ChildrenBlock
        title={"Children"}
        subTitle={"Have special circumstances"}
        children={specialChildren}
      />
      <ChildrenBlock
        title={"Children"}
        children={schoolChildren}
        subTitle={"Need school stationery"}
      />
      <ChildrenBlock
        title={"Children"}
        children={foodChildren}
        subTitle={"Need food"}
      />
      <Section3 />
    </div>
  );
};

export default GuestHomePage;
