import React from 'react';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import Children3 from "@Images/children3.jpg";
import Children4 from "@Images/children4.png";
import FoodDonation from "@Images/food-donation.png";
import Money from "@Images/salary.png";


const isMobile = false;

const page2Data = [
  {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/eYNnmGagLWdrkdMHVUuA.svg',
    name: '',
  },
  {
    img: Money,
    name: 'Donate money',
    slogan: (<div id="app.home.product-pro-slogan" className='slogan' >View more</div>),
  },
  {
    img: FoodDonation,
    name: 'Donate necessaries',
    slogan: (<div id="app.home.product-pro-slogan" className='slogan' >View more</div>),
  },
  {
    img: Children4,
    name: 'Adopt children',
    slogan: (<div id="app.home.product-pro-slogan" className='slogan' >View more</div>),
  },
];




export default function Page2() {
    const componentButton = (
        <div key="b" className="components-button-wrapper">
          
        </div>
      );
      const children = page2Data.map((item, i) => {
        if (!isMobile && !i) {
          return null;
        }
        const content = isMobile && !i ? componentButton : [
          <p key="p">{item.slogan}</p>,
          
        ];
        return (
          <Row className="product-block" key={i.toString()}>
            <Col
              xs={8}
              md={6}
              className={`block-image-wrapper${i % 2 ? ' right' : ''}`}
            >
              <img src={item.img} style={isMobile && i === 2 ? { marginLeft: 16 } : {}} />
            </Col>
            <Col xs={16} md={18} className="block-text-wrapper">
              <h4>{item.name}</h4>
              {content}
            </Col>
          </Row>
        );
      });
  return (
    <div className="home-page-wrapper page2" id="page2">
      <div className="page">
        <h3 className='topic-name'>
          Our service
        </h3>
        <ScrollOverPack
          component={Row}
          className="page2-content"
          playScale="0.4"
        >
          <QueueAnim
            component={Col}
            componentProps={{ xs: 24, md: 12 }}
            className="page2-components"
            key="left"
            type="bottom"
            leaveReverse
          >
             <img className="custombanner" src={Children3} />
          </QueueAnim>
          <QueueAnim
            component={Col}
            componentProps={{ xs: 24, md: 12 }}
            className="page2-product"
            key="right"
            type="bottom"
            leaveReverse
          >
            {children}
          </QueueAnim>
        </ScrollOverPack>
      </div>
     
    </div>
  );
}
