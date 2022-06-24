import React from "react";
import { Image, List } from "antd";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { Link } from "react-router-dom";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { displayDate } from "@Services/FormatDateTimeService";
import FallBackImage from "@Images/children-default.png";
export interface IProps {
  children: IChildrenProfileModel[];
  id: number;
}
const childrenProfileService = new ChildrenProfileService();

const OtherChildrenBlock: React.FC<IProps> = ({ children, id }: IProps) => {
  const [data, setData] = React.useState<IChildrenProfileModel[]>([]);

  React.useEffect(() => {
    if (children.length > 0) {
      fetchChildrenProfile();
    }
  }, [children]);

  function convertAddressToString(address: string) {
    const tempAddress = address.split("-");
    let result = "";
    tempAddress.reverse();
    tempAddress.map((v) => {
      result += v + " ";
    });

    return result;
  }

  async function fetchChildrenProfile() {
    const tempValue = children.filter((c) => c.id !== id);
    for (let index = 0; index < tempValue.length; index++) {
      let tempId = await getImage(tempValue[index].id);
      tempValue[index].imageId = tempId;
    }
    setData(tempValue);
  }

  function viewImg(id) {
    const imageRes = childrenProfileService.getImageUrl(id);
    return imageRes.toString();
  }

  async function getImage(id: number) {
    const imageRes = await childrenProfileService.getChildrenImage(id);
    const imageData = imageRes.value.items;

    if (imageData.length > 0) {
      return imageData[0].id;
    } else {
      return -1;
    }
  }

  return (
    <div className="content-wrapper-custom" style={{ padding: "0" }}>
      <List
        grid={{ gutter: 16, column: 6 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Link to={`${item.id}`} target="_blank">
              <div className="item">
                <Image
                  preview={false}
                  className="img-item"
                  src={viewImg(item.imageId)}
                  fallback={FallBackImage}
                  alt={"img" + item.id}
                />
                <div className="info">
                  <h3>{item.fullName}</h3>
                  <p className="descroption">
                    {displayDate(item.dob)} | Gender:
                    {item.gender ? " Boy" : " Girl"}
                  </p>
                  <p className="descroption">
                    {convertAddressToString(item.publicAddress)}
                  </p>
                </div>
              </div>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default OtherChildrenBlock;
