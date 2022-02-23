import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import {  Button } from 'antd';
import QueueAnim from 'rc-queue-anim';

const isMobile= false;
export default function Page3() {
  return (
    <ScrollOverPack id="page3" className="content-wrapper page page3">
      <TweenOne
        key="image"
        className="image3 image-wrapper"
        animation={{ x: 0, opacity: 1, ease: 'easeOutQuad' }}
        style={{ transform: 'translateX(-100px)', opacity: 0 }}
      />
      <QueueAnim
        className="text-wrapper"
        key="text"
        type={isMobile ? 'bottom' : 'right'}
        leaveReverse
        style={{ top: '40%' }}
      >
        <h2 key="h2"></h2>
        <p key="p" style={{ maxWidth: 280 }}>
          Click here to contact us
        </p>
        <div key="button">
          <a>
            <Button type="primary" size="large">
              Contact us
              
            </Button>
          </a>
        </div>
      </QueueAnim>
    </ScrollOverPack>
  );
}

