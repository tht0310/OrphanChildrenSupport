import { Image } from "antd";
import * as React from "react";
import { Facebook, Mail, Phone } from "react-feather";
import { RouteComponentProps } from "react-router";
import GoogleMapReact from "google-map-react";
import { Link } from "react-router-dom";
import Children from "@Images/children5.jpg";
import CIcon from "@coreui/icons-react";
import { cilBaby } from "@coreui/icons";
import Counter from "react-number-counter";
type Props = RouteComponentProps<{}>;

const AboutUsPage: React.FC<Props> = () => {
  return (
    <div className="aboutus-page">
      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-copy">
                <h1>We believe every child deserves a future</h1>
                <p className="hero-paragraph">
                  Our vision to mobilize the sponsors to create life-changing
                  moments for children who have experienced Corona pandemic
                  trauma..
                </p>
                <div className="hero-cta">
                  <Link to="/children" style={{ paddingRight: "10px" }}>
                    Donate now
                  </Link>
                  <Link to="/contactUs">Get in touch</Link>
                </div>
              </div>
              <div>
                <Image
                  preview={false}
                  className="img-item"
                  width={600}
                  src={Children}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="section-padding pt-0">
          <h3>OUR RESPONSE</h3>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="text-center border p-4 rounded mb-4">
                  <span className="counter  text-dark font-weight-normal">
                    <Counter start={100} end={1000} delay={5} />
                  </span>
                  <h5 className="text-uppercase mt-2">Our Children</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="text-center border p-4 rounded mb-4">
                  <span className="counter text-dark font-weight-normal">
                    <Counter start={100} end={400} delay={5} />
                  </span>
                  <h5 className="text-uppercase mt-2">
                    Children need supported
                  </h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="text-center border p-4 rounded mb-4">
                  <span className="counter text-dark font-weight-normal">
                    <Counter start={0} end={40} delay={15} />
                  </span>
                  <h5 className="text-uppercase mt-2">
                    {" "}
                    Children need adopted
                  </h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="text-center border p-4 rounded ">
                  <span className="counter text-dark font-weight-normal">
                    <Counter start={100} end={400} delay={8} />
                  </span>
                  <h5 className="text-uppercase mt-2">
                    Children recieved hapiness
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;
