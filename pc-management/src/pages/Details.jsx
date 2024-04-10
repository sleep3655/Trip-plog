import React, { useState } from "react";
import { Button, Image } from "antd";
import NavBar from "../components/NavBar/NavBar";
const Details = () => {
  return (
    <NavBar title='游记详情'>
      <Image
        width={200}
        preview={{
          imageRender: () => (
            <video
              muted
              width="100%"
              controls
              src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*uYT7SZwhJnUAAAAAAAAAAAAADgCCAQ"
            />
          ),
          toolbarRender: () => null,
        }}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    </NavBar>
  );
};
export default Details;
