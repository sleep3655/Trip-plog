import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Space, Row, Col, Table, Tag, message, Popconfirm,Modal } from "antd";
import styles from "./index.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

const ViewList = () => {
  const [form] = Form.useForm();
  const [rejectForm] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [recordId, setRecordId] = useState("");
  const [role, setRole] = useState('');
  const [updatedDataSource, setupdatedDataSource] = useState([]);
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);//读取当前用户权限
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/plog");
        const dArray = Array.from(response.data);
        const dataArray = dArray.filter((item) => !item.delete);
        setDataSource(dataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // 获得搜索表单结果
  const handleSearchFinish = (values) => {
    const stateValue = values.state;
    const filteredData = dataSource.filter(
      (item) => item.status === stateValue
    );
    const updatedDataSource = [
      ...filteredData,
      ...dataSource.filter((item) => item.status !== stateValue),
    ];
    setupdatedDataSource(updatedDataSource);
  };
  // 清空
  const handleSearchReset = () => {
    // console.log(form);
    rejectForm.resetFields();
  };

  // 查看游记详情
  const navigate = useNavigate();
  // 游记表格列配置
  const Columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "3",
      width: 120,
      ellipsis: true,
      onCell: (dataSource) => ({
        // 跳转详情页
        onClick: () => {
          navigate(`/management/details/${dataSource._id}`);
          console.log(dataSource._id);
        },
      }),
    },
    {
      title: "日志内容",
      dataIndex: "content",
      key: "4",
      width: 300, 
      ellipsis: true,
    },
    {
      title: "图片",
      dataIndex: "photourl",
      key: "photourl",
      width: 160, 
      render: (photourl) => (
        <img
          src={photourl[0]}
          alt="图片"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      title: "发布时间",
      dataIndex: "time",
      key: "5",
      width: 200, 
      ellipsis: true, 
      render: (time) => <span>{time.slice(0, 19)}</span>,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "6",
      width: 100, 
      ellipsis: true, 
      //   render: (_, { status }) => (
      //     <>
      //       {status.map((tag) => {
      //         let color = tag.length > 5 ? "geekblue" : "green";
      //         if (tag === "已通过") {
      //           color = "green";
      //         } else if (tag === "待审核") {
      //           color = "geekblue";
      //         } else if (tag === "已拒绝") {
      //           color = "magenta";
      //         }
      //         return (
      //           <Tag color={color} key={tag}>
      //             {tag.toUpperCase()}
      //           </Tag>
      //         );
      //       })}
      //     </>
      //   ),
    },
  ];

  // 拒绝并填写理由
   const [isModalOpen, setIsModalOpen] = useState(false);
  
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
  const confirmDelete = (recordId) => {
    sendDeleteRequest(recordId);
   
  };
  const cancelDelete = (e) => {
    console.log(e);
    message.error("取消删除");
  };
  const [isDeleted, setIsDeleted] = useState(false);
  const handleViewDelete = () => {
    // 执行逻辑删除
    setIsDeleted(true);
  
  };
const sendDeleteRequest = async (recordId) => {
  try {
    const response = await axios.post('/api/delete', {recordId});
    console.log('删除成功:', response.data);
    message.success('删除成功');
  } catch (error) {
    console.error('删除出错:', error);
    console.error('删除出错:', recordId);
  }
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
        const isRejected = record.status.substring(0, 3) === "未通过";
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
                onConfirm={() => confirmDelete(record._id)}
                onCancel={cancelDelete}
                okText="确认"
                cancelText="取消"
              >
                <Button type="link" danger onClick={handleViewDelete} disabled={role === 'audit'}> 
                  删除
                </Button>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <>
      <NavBar title="审核列表">
        <Form
          name="search"
          form={form}
          onFinish={handleSearchFinish}
          initialValues={{
            name: "",
            title: "",
            state: "",
          }}
          style={{ margin: "0 0 0 400px" }}
        >
          <Row gutter={10}>
            <Col span={6}>
              <Form.Item name="state" label="状态">
                <Select
                  placeholder="请选择状态"
                  allowClear //支持清空
                  showSearch
                  options={[
                    {
                      value: "待审核",
                      label: "待审核",
                    },
                    {
                      value: "已通过",
                      label: "已通过",
                    },
                    {
                      value: "已拒绝",
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
            <Col span={4}>
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
            dataSource={
              updatedDataSource.length > 0 ? updatedDataSource : dataSource
            }
            columns={columns}
            scroll={{ x: 1000 }}
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
