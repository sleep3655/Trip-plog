import { Space, Table, Tag } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar/NavBar";

const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "3",
    width: 120, // 设置固定宽度
    ellipsis: true, // 使用省略号显示多余文字
  },
  {
    title: "日志内容",
    dataIndex: "content",
    key: "4",
    width: 300, // 设置固定宽度
    ellipsis: true, // 使用省略号显示多余文字
  },
  {
    title: "图片",
    dataIndex: "photourl",
    key: "photourl",
    width: 200, // 设置固定宽度
    render: (photourl) => <img src={photourl[0]} alt="图片" style={{ width: "100px", height: "100px" }} />,
  },
  {
    title: "发布时间",
    dataIndex: "time",
    key: "5",
    width: 200,
    render: (time) => <span>{time.slice(0, 19)}</span>,
  },
  {
    title: "状态",
    dataIndex: "deletstatus",
    key: "deletstatus",
    width: 150,
    render: () => "已删除",
  },
];
const DeleteList = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/plog");
        const dArray = Array.from(response.data)
        const dataArray = dArray.filter(item => item.delete)
        setdata(dataArray); // 更新状态变量
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    // showSizeChanger: true,
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };
  const [total, setTotal] = useState(0);
  return (
    <>
      <NavBar title="回收站">
        <Table columns={columns} dataSource={data}
          pagination={{
            ...pagination,
            total,
            showTotal: (total) => `共 ${total} 条`,
            onChange: handleTableChange,
          }} />
      </NavBar>
    </>
  );
};
export default DeleteList;
