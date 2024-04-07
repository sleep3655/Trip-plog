import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout as AntdLayout, Menu, theme } from "antd";
// 引入css样式
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
const { Header, Content, Sider } = AntdLayout;

const Items = [
  {
    key: "management",
    icon: <UserOutlined />,
    label: "审核管理",
    children: [
      { key: "/management/list", label: "待审核列表" },
      { key: "/management/delete", label: "已删除游记" },
    ],
  },
];

export function Layout({ children }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //   跳转
  const navigate = useNavigate();

  return (
    // 铺满
    <AntdLayout style={{ width: "100vw", height: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className={styles.logo}>Trip-plog后台管理系统</div>
      </Header>
      <AntdLayout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["/management/list"]}
            defaultOpenKeys={["management"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={Items}
            onClick={(key) => {
              navigate(key.key);
            }}
          />
        </Sider>
        <AntdLayout
          style={{
            padding: "0 24px 24px",
          }}
        >
          {/* 面包屑 */}
          {/* <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div>{children}</div>
          </Content>
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  );
}
