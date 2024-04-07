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
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '状态',
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
    key: '1',
    name: '贝壳',
    title: '标题',
    content: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
    tags: ['已审核', ],
  },

];
const DeleteList = () => <Table columns={columns} dataSource={data} />;
export default DeleteList;