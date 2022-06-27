import { ILoginModel } from "@Models/ILoginModel";
import { Button } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";

interface Props {}

const Section2: FC<Props> = () => {
  const [localUser, setLocalUser] = React.useState<ILoginModel>(null);
  React.useEffect(() => {
    getLocalUser();
  }, []);

  function getLocalUser() {
    var retrievedObject = localStorage.getItem("currentUser");
    if (retrievedObject) {
      setLocalUser(JSON.parse(retrievedObject));
    }
  }
  return (
    <div
      className="section2"
      style={{ marginTop: "80px", marginBottom: "50px" }}
    >
      <div
        style={{
          textAlign: "center",
          color: "white",
        }}
        className="title"
      >
        Join us in helping bring love, hope and safety to all of the children in
        foster care
      </div>
      {localUser === null && (
        <div
          style={{
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          <Button
            style={{
              color: "white",
              background: "#B42121",
              border: "#B42121",
              fontWeight: "bold",
            }}
          >
            <Link to={"/register"}> Register Now</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Section2;
