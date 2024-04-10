import React, { useState } from "react";
import { Button, Form, Input, Select, Space, Row, Col, Table, Tag ,message, Popconfirm} from "antd";
import styles from "./index.module.css";
import { Axios } from "axios";
import NavBar from "../components/NavBar/NavBar";
// import { useHistory } from 'react-router-dom';

const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    pic: 32,
    title: "西湖区湖底公园1号",
    content: "xxxxxxxxxxx",
    time: "2016-10-03",
    state: ["已通过"],
  },
  {
    key: "1",
    name: "胡彦斌",
    pic: 32,
    title: "西湖区湖底公园1号",
    content: "xxxxxxxxxxx",
    time: "2016-10-03",
    state: ["待审核"],
  },
  {
    key: "1",
    name: "胡彦斌",
    pic: 32,
    title: "西湖区湖底公园1号",
    content: "xxxxxxxxxxx",
    time: "2016-10-03",
    state: ["待审核"],
  },
  {
    key: "1",
    name: "胡彦斌",
    pic: 32,
    title: "西湖区湖底公园1号",
    content: "xxxxxxxxxxx",
    time: "2016-10-03",
    state: ["已拒绝"],
  },
  {
    key: "1",
    name: "胡彦斌",
    pic: 32,
    title: "西湖区湖底公园1号",
    content: "xxxxxxxxxxx",
    time: "2016-10-03",
    state: ["待审核"],
  },
  {
    key: "1",
    name: "胡彦斌",
    pic: 32,
    title: "西湖区湖底公园1号",
    content: "xxxxxxxxxxx",
    time: "2016-10-03",
    state: ["已通过"],
  },
];

// 游记表格
const Columns = [
  {
    title: "昵称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "图片",
    dataIndex: "picture",
    key: "picture",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "日志内容",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "发布时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "状态",
    dataIndex: "state",
    key: "state",
    render: (_, { state }) => (
      <>
        {state.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "已通过") {
            color = "green";
          } else if (tag === "待审核") {
            color = "geekblue";
          } else if (tag === "已拒绝") {
            color = "magenta";
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
];

const ViewList = () => {
  const [form] = Form.useForm();

  // 获得搜索表单结果
  const handleSearchFinish = (values) => {
    console.log("搜索表单结果", values);
  };
  // 清空
  const handleSearchReset = () => {
    // console.log(form);
    form.resetFields();
  };
  // 拒绝并填写理由
  const handleViewReject = () => {};
  // 管理员删除游记
  const confirm = (e) => {
    console.log(e);
    message.success('删除成功');
  };
  const cancel = (e) => {
    console.log(e);
    message.error('取消删除');
  };
  const [isDeleted, setIsDeleted] = useState(false);
  const handleViewDelete = () => {
    // 执行逻辑删除
    setIsDeleted(true);
    console.log("执行逻辑删除操作");
  };

  // 设置分页
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    // showSizeChanger: true,
  });
  const [total, setTotal] = useState(0);
  // const handleTableChange = (pagination) => {
  //   console.log(pagination);
  // };

  // 审核操作
  const columns = [
    ...Columns,
    {
      title: "操作",
      key: "action",
      render: (text, record) => {
        return (
          <>
            <></>
            <Space>
              <Button type="link">通过</Button>
              <Button type="link" onClick={handleViewReject}>
                拒绝
              </Button>
              <Popconfirm
                title="删除该游记"
                // description="确定删除?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="确认"
                cancelText="取消"
              >
                <Button type="link" danger onClick={handleViewDelete}>
                  删除
                </Button>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];
  // 跳转到回收站
  // const history = useHistory();
  // const handleDeleteClick = () => {
  //   history.push('/management/delete');
  // };

  return (
    <>
      <NavBar title="审核列表" operation={<Button>回收站</Button>}>
        <Form
          name="search"
          form={form}
          onFinish={handleSearchFinish}
          initialValues={{
            name: "",
            title: "",
            state: "",
          }}
          style={{ margin: "0 0 0 150px" }}
        >
          <Row gutter={24}>
            <Col span={5}>
              <Form.Item name="name" label="昵称">
                <Input placeholder="请输入昵称" allowClear />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="title" label="标题">
                <Input placeholder="请输入标题" allowClear />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="state" label="状态">
                <Select
                  placeholder="请选择状态"
                  allowClear //支持清空
                  showSearch
                  options={[
                    {
                      value: "view",
                      label: "待审核",
                    },
                    {
                      value: "pass",
                      label: "已通过",
                    },
                    {
                      value: "reject",
                      label: "已拒绝",
                    },
                    // {
                    //   value: "disabled",
                    //   label: "Disabled",
                    //   disabled: true,
                    // },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                  <Button htmlType="submit" onClick={handleSearchReset}>
                    清空
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {/* 游记列表 */}
        <div className={styles.tableWrap}>
          <Table
            dataSource={dataSource}
            columns={columns}
            scroll={{ x: 1000 }}
            // onChange={handleTableChange}
            pagination={{
              ...pagination,
              total,
              showTotal: (total) => `共 ${total} 条`,
            }}
          />
        </div>
      </NavBar>
    </>
  );
};
export default ViewList;
