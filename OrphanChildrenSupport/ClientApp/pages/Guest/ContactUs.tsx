import { Col, Row } from "antd";
import * as React from "react";
import { Facebook, Mail, Phone } from "react-feather";
import { RouteComponentProps } from "react-router";
import GoogleMapReact from "google-map-react";

type Props = RouteComponentProps<{}>;

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 11,
};

const ContactUsPage: React.FC<Props> = () => {
  return (
    <div className="contact-page">
      <h3>Contact Us</h3>
      <p>
        Follow us to find out how we're changing the lives of children – and how
        you can help.
      </p>
      <Row className="content-wrapper">
        <Col span={8}>
          <div className="content">
            <Row className="first-block" align="middle">
              <Col span={10}>
                <Phone
                  className="suffix-icon"
                  style={{
                    float: "right",
                    marginRight: "35px",
                    width: "35px",
                    height: "35px",
                  }}
                />
              </Col>
              <Col span={12}>
                <div>Call Today</div>
                <div className="main-content">0123456789</div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={8}>
          <Row className="second-block" align="middle">
            <Col span={8}>
              <Mail
                className="suffix-icon"
                style={{
                  float: "right",
                  marginRight: "35px",
                  width: "35px",
                  height: "35px",
                }}
              />
            </Col>
            <Col span={14}>
              <div>Email Us</div>
              <div className="main-content">forthechildren@gmail.com</div>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row className="third-block" align="middle">
            <Col span={8}>
              <Facebook
                className="suffix-icon"
                style={{
                  float: "right",
                  marginRight: "35px",
                  width: "35px",
                  height: "35px",
                }}
              />
            </Col>
            <Col span={14}>
              <div>Facebook</div>
              <div className="main-content">ForTheChildren</div>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="map-container">
        <Row style={{ height: 500 }} className="map">
          <Col span={11} style={{ paddingTop: "10%" }}>
            <h3>Our home</h3>
            <div>
              Nam Ky Khoi Nghia Street, Hoa Phu Village, Thu Dau Mot city, Binh
              Duong Provice, VietNam.
            </div>
          </Col>
          <Col span={12}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.8079981344804!2d106.66398021377069!3d11.053017357052177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1d7df763eaf%3A0xf4323e44f2867057!2sEastern%20International%20University!5e0!3m2!1sen!2s!4v1647087588750!5m2!1sen!2s"
              width="600"
              height="450"
            ></iframe>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactUsPage;
