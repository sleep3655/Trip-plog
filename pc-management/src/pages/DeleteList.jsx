import { Space, Table, Tag } from "antd";
// import { useNavigate, Outlet } from "react-router-dom";
import { Axios } from "axios";
import NavBar from "../components/NavBar/NavBar";

const columns = [
  {
    title: "昵称",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "状态",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "已删除") {
            color = "volcano";
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
  // {
  //   title: '操作',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       {/* <a>邀请 {record.name}</a> */}
  //       <a >编辑</a>
  //       <a>删除</a>
  //     </Space>
  //   ),
  // },
];
const data = [
  {
    key: "1",
    name: "贝壳",
    title: "标题",
    content: "XXXXXXXXXXXXXXXXXXXXXXXXX",
    tags: ["已删除"],
  },
];
const DeleteList = () => {
  return (
    <>
      <NavBar title="回收站">
        <Table columns={columns} dataSource={data} />
      </NavBar>
    </>
  );
};
export default DeleteList;
