import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Space, Row, Col, Table, Tag, message, Popconfirm,Modal } from "antd";
import styles from "./index.module.css";
import axios from "axios";
import NavBar from "../components/NavBar/NavBar";
// import { useHistory } from 'react-router-dom';

const Columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "3",
    width: 100, // 设置固定宽度
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
    width: 150, // 设置固定宽度
    render: (photourl) => <img src={photourl} alt="图片" style={{ width: "100px", height: "100px" }} />,
  },
  {
    title: "发布时间",
    dataIndex: "time",
    key: "5",
    width: 150, // 设置固定宽度
    ellipsis: true, // 使用省略号显示多余文字
    render: (time) => <span>{time.slice(0, 19)}</span>,
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "6",
    width: 100, // 设置固定宽度
    ellipsis: true, // 使用省略号显示多余文字
  },
];

const ViewList = () => {
  const [form] = Form.useForm();
  const [rejectForm] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
   const [recordId, setRecordId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/plog"); // 替换为您的实际API端点
        const dArray = Array.from(response.data)
        const dataArray = dArray.filter(item => !item.delete)
        setDataSource(dataArray); // 更新状态变量
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  // 获得搜索表单结果
  const handleSearchFinish = (values) => {
    console.log("搜索表单结果", values);
  };
  // 清空
  const handleSearchReset = () => {
    // console.log(form);
    rejectForm.resetFields();
  };
  // 拒绝并填写理由
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isRejected, setIsRejected] = useState(false);
   const handleViewReject = (recordId) => {
    setIsModalOpen(true);
    setRecordId(recordId);
    console.log("recordId",recordId)
};
   const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFinish = (values) => {
    //提交拒绝理由
     const { reason } = values;
    console.log('拒绝理由:', values.reason);
    sendRejectRequest(recordId, reason);
    setIsModalOpen(false);
    setIsRejected(true);
 
  };
const sendRejectRequest = async (recordId, reason) => {
  try {
    const response = await axios.post('/api/reject', { recordId, reason });
    console.log('请求成功:', response.data);
    console.error('请求出错:', recordId);
  } catch (error) {
    console.error('请求出错:', error);
    console.error('请求出错:', recordId);
  }
};

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

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };
  const [total, setTotal] = useState(0);
  // const handleTableChange = (pagination) => {
  //   console.log(pagination);
  // };

    //审核通过
const handleApprove = async (record) => {
    try {
      const response = await axios.post("/api/approve", { id: record._id });
      // 处理成功响应
      console.log("通过成功:", response.data);
    } catch (error) {
      // 处理错误
      console.error("通过失败:", error);
      console
    }
  };
  // 审核操作
  const columns = [
    ...Columns,
    {
      title: "操作",
      key: "action",
      render: (text, record) => {
        const isApproved = record.status === "已通过";
         const isDisabled = isApproved || isRejected;
        return (
          <>
            <></>
            <Space>
              <Button type="link" onClick={() => handleApprove(record)}  disabled={isDisabled}>通过</Button>
              <Button type="link" onClick={() =>handleViewReject(record._id)} disabled={isDisabled }>
                拒绝
              </Button>

        <Modal
          title="填写拒绝理由"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form = {rejectForm} onFinish={handleFinish} initialValues="">
            <Form.Item
              name="reason"
              rules={[{ required: true, message: '请填写拒绝理由' }]}
            >
              <Input.TextArea placeholder="请输入拒绝理由" rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
  
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
              onChange: handleTableChange,
            }}
          />
        </div>
      </NavBar>
    </>
  );
};
export default ViewList;
