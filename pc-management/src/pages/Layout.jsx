import { UserOutlined, DownOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Layout as AntdLayout,
  Menu,
  theme,
  Dropdown,
  Space,
} from "antd";
// 引入css样式
import styles from "./index.module.css";
import { useNavigate, Outlet } from "react-router-dom";
import React, { useEffect } from "react";

const { Header, Content, Sider } = AntdLayout;

const Items = [
  {
    key: "/management",
    icon: <UserOutlined />,
    label: "审核管理",
    children: [
      { key: "/management/view", label: "待审核ing" },
      { key: "/management/delete", label: "回收站" },
      // { key: "/management/details", label: "游记详情" },
    ],
  },
];

export function Layout() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  // 身份显示
  let roleString;
  if (role === "admin") {
    roleString = "管理员";
  } else {
    roleString = "审核员";
  }
  console.log(roleString);
  useEffect(() => {
    if (!role) {
      window.location.href = "/"; // 跳转到登录页面
    }
  }, [navigate]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    // 铺满
    <AntdLayout style={{ width: "100vw", height: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className={styles.logo}>Trip-plog后台管理系统</div>
        <span className={styles.user}>
          <Dropdown
            menu={{
              items: [
                {
                  label: "退出登录",
                  key: "1",
                  onClick: () => {
                    localStorage.removeItem("role");
                    window.location.href = "/"; // 跳转到登录页面并刷新
                  },
                },
              ],
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {roleString}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </span>
      </Header>
      <AntdLayout className={styles.sectionInner}>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["/management/view"]}
            defaultOpenKeys={["/management"]}
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
        <AntdLayout className={styles.layoutContent}>
          <Content className={styles.content}>
            <Outlet />
          </Content>
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  );
}
