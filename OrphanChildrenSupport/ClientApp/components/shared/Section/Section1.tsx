import React from "react";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import ScrollOverPack from "rc-scroll-anim/lib/ScrollOverPack";
import Shirt from "@Images/tshirt.png";
import Food from "@Images/fast-food.png";
import School from "@Images/school.png";
import Medical from "@Images/medical.png";
import Money from "@Images/dollar.png";
import Family from "@Images/family.png";
import { Col } from "antd";
const { TweenOneGroup } = TweenOne;

const featuresCN = [
  {
    title: "Clothes",
    content: "Clothes, shoes or accessories",
    src: Shirt,
    color: "#e57905",
    shadowColor: "rgba(19,194,194,.12)",
  },
  {
    title: "Food",
    content: "Instant noodles, rice or milk",
    src: Food,
    color: "#e57905",
    shadowColor: "rgba(47,84,235,.12)",
  },
  {
    title: "School Stationery",
    content: "School bag, book or pen",
    src: School,
    color: "#e57905",
    shadowColor: "rgba(245,34,45,.12)",
  },
  {
    title: "Medical Care",
    content: "Medicine or treatment costs",
    src: Medical,
    color: "#e57905",
    shadowColor: "rgba(26,196,77,.12)",
  },
  {
    title: "Money",
    content: "Living or studying expenses",
    src: Money,
    color: "#e57905",
    shadowColor: "rgba(250,173,20,.12)",
  },
  {
    title: "Adoption",
    content: "Give them a family",
    src: Family,
    color: "#e57905",
    shadowColor: "rgba(114,46,209,.12)",
  },
];

const pointPos = [
  { x: -30, y: -10 },
  { x: 20, y: -20 },
  { x: -65, y: 15 },
  { x: -45, y: 80 },
  { x: 35, y: 5 },
  { x: 50, y: 50, opacity: 0.2 },
];

class Section1 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hoverNum: null,
    };
  }
  onMouseOver = (i) => {
    this.setState({
      hoverNum: i,
    });
  };
  onMouseOut = () => {
    this.setState({
      hoverNum: null,
    });
  };
  getEnter = (e) => {
    const i = e.index;
    const r = Math.random() * 2 - 1;
    const y = Math.random() * 10 + 5;
    const delay = Math.round(Math.random() * (i * 50));
    return [
      {
        delay,
        opacity: 0.4,
        ...pointPos[e.index],
        ease: "easeOutBack",
        duration: 300,
      },
      {
        y: r > 0 ? `+=${y}` : `-=${y}`,
        duration: Math.random() * 1000 + 2000,
        yoyo: true,
        repeat: -1,
      },
    ];
  };
  render() {
    const { hoverNum } = this.state;
    let children = [[], [], []];
    featuresCN.forEach((item, i) => {
      const isHover = hoverNum === i;
      const pointChild = [
        "point-0 left",
        "point-0 right",
        "point-ring",
        "point-1",
        "point-2",
        "point-3",
      ].map((className) => (
        <TweenOne
          component="i"
          className={className}
          key={className}
          style={{
            background: item.color,
            borderColor: item.color,
          }}
        />
      ));
      const child = (
        <Col xs={12} lg={8} key={i.toString()} style={{ marginBottom: "30px" }}>
          <div
            className="page1-box"
            onMouseEnter={() => {
              this.onMouseOver(i);
            }}
            onMouseLeave={this.onMouseOut}
          >
            <TweenOneGroup
              className="page1-point-wrapper"
              enter={this.getEnter}
              leave={{
                x: 0,
                y: 30,
                opacity: 0,
                duration: 300,
                ease: "easeInBack",
              }}
              resetStyleBool={false}
            >
              {isHover && pointChild}
            </TweenOneGroup>
            <div
              className="page1-image"
              style={{
                boxShadow: `${isHover ? "0 12px 24px" : "0 6px 12px"} ${
                  item.shadowColor
                }`,
              }}
            >
              <img
                src={item.src}
                alt="img"
                style={i === 4 ? { marginLeft: -15 } : {}}
              />
            </div>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        </Col>
      );

      children[Math.floor(i / 3)].push(child);
    });

    children = children.map((item, i) => (
      <QueueAnim
        className="page1-box-wrapper"
        key={i.toString()}
        type="bottom"
        leaveReverse
        delay={[i * 100, (children.length - 1 - i) * 100]}
        component="Row"
      >
        {item}
      </QueueAnim>
    ));
    return (
      <div
        className="home-page page1"
        style={{ minHeight: "600px", marginBottom: "40px" }}
      >
        <div className="home-page-wrapper" id="page1-wrapper">
          <ScrollOverPack
            id="page3"
            className="content-wrapper page"
            style={{ marginTop: "20px" }}
          >
            <QueueAnim
              type="bottom"
              className="page text-center"
              leaveReverse
              key="page"
            >
              <h2
                style={{
                  color: "#88181b",
                  fontWeight: "bold",
                  marginBottom: "0px",
                  fontSize: "32px",
                }}
              >
                What you can help?
              </h2>

              <div
                style={{
                  margin: "5px",
                  fontSize: "17px",
                  marginBottom: "15px",
                }}
              >
                Make a donation to change their lives
              </div>
              <div
                style={{
                  borderBottom: "1px solid red",
                  width: "30px",
                  margin: "auto",
                  marginTop: "15px",
                  marginBottom: "30px",
                  height: "5px",
                  background: "#88181b",
                  borderRadius: "5px",
                }}
              ></div>

              <span key="line" className="separator" />
            </QueueAnim>
          </ScrollOverPack>
          <OverPack>{children}</OverPack>
        </div>
      </div>
    );
  }
}

export default Section1;
