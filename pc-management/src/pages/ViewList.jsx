import React from 'react';
import { Space, Table, Tag } from 'antd';
// import { useNavigate, Outlet } from "react-router-dom";

const columns = [
  {
    title: '昵称',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '信息',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === '院士') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        {/* <a>邀请 {record.name}</a> */}
        <a >编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 20,
    phone: '17268993404',
    tags: ['学生', ],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 38,
    phone: '18273638234',
    tags: ['讲师','辅导员'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 45,
    phone: '19374620322',
    tags: ['教授','院士'],
  },
];
const ViewList = () => <Table columns={columns} dataSource={data} />;
export default ViewList;