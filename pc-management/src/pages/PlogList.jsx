import React, { useState } from 'react';
import { Card } from 'antd';

// const tabList = [
//   {
//     key: 'tab1',
//     tab: '我的游记',
//   },
  // {
  //   key: 'tab2',
  //   tab: 'tab2',
  // },
// ];
const contentList = {
  tab1: <p>游记列表</p>,
  // tab2: <p>content2</p>,
};



const PlogList = () => {
  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  // const [activeTabKey2, setActiveTabKey2] = useState('app');
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  // const onTab2Change = (key) => {
  //   setActiveTabKey2(key);
  // };
  return (
    <>
      <Card
        style={{
          width: '100%',
        }}
        title="旅游日志合集"
        // extra={<a href="#">More</a>}
        // tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
     
    </>
  );
};
export default PlogList;