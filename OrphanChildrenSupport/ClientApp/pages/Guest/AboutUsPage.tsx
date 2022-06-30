import { Col, Image, Row } from "antd";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import Children from "@Images/children5.jpg";
import Counter from "react-number-counter";
type Props = RouteComponentProps<{}>;

const AboutUsPage: React.FC<Props> = () => {
  React.useEffect(() => {
    document.title = "About Us | FOR THE CHILDREN";
  }, []);

  return (
    <div className="aboutus-page">
      <main>
        <section className="hero">
          <div className="container">
            <Row>
              <Col span={12} lg={12} xs={24} className="text-container">
                <h1>We believe every child deserves a future</h1>
                <p className="hero-paragraph">
                  Our vision to mobilize the sponsors to create life-changing
                  moments for children who have experienced Corona pandemic
                  trauma..
                </p>
                <div className="hero-cta">
                  <Link to="/children" style={{ paddingRight: "10px" }}>
                    Send Donation
                  </Link>
                  <Link to="/contactUs">Get In Touch</Link>
                </div>
              </Col>
              <Col lg={12} xs={24} span={12}>
                <Image preview={false} className="img-item" src={Children} />
              </Col>
            </Row>
          </div>
        </section>
        <section className="section-padding pt-0">
          <h3>OUR RESPONSE</h3>
          <div className="container">
            <Row>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div
                  className="text-center border p-4 rounded mb-4"
                  style={{ height: "160px" }}
                >
                  <span className="counter  text-dark font-weight-normal">
                    <Counter start={100} end={1000} delay={5} />
                  </span>
                  <h5 className="text-uppercase mt-2">Children</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div
                  className="text-center border p-4 rounded mb-4"
                  style={{ height: "160px" }}
                >
                  <span className="counter text-dark font-weight-normal">
                    <Counter start={100} end={400} delay={5} />
                  </span>
                  <h5 className="text-uppercase mt-2">
                    Children will be supported
                  </h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div
                  className="text-center border p-4 rounded mb-4"
                  style={{ height: "160px" }}
                >
                  <span className="counter text-dark font-weight-normal">
                    <Counter start={0} end={400} delay={15} />
                  </span>
                  <h5 className="text-uppercase mt-2">
                    {" "}
                    Children will get happiness
                  </h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-xs-6">
                <div
                  className="text-center border p-4 rounded "
                  style={{ height: "160px" }}
                >
                  <span className="counter text-dark font-weight-normal">
                    <Counter start={100} end={40} delay={8} />
                  </span>
                  <h5 className="text-uppercase mt-2">
                    Children will be adopted
                  </h5>
                </div>
              </div>
            </Row>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;
