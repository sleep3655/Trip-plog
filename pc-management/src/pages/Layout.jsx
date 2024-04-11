import React from "react";
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
import { useNavigate,Outlet } from "react-router-dom";
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


// 用户
const userItems = [
  {
    label: "用户中心",
    key: "0",
  },
  {
    label: "退出登录",
    key: "1",
  },
];

export function Layout() {
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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className={styles.logo}>Trip-plog后台管理系统</div>
        <span className={styles.user}>
          <Dropdown
            menu={{
              items: userItems,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                用户名
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </span>
      </Header>
      <AntdLayout  className={styles.sectionInner}>
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
        <AntdLayout
        className={styles.layoutContent}
        >
          <Content
            className={styles.content}
          >
            {/* 子页面 */}
            <Outlet/>
          </Content>
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  );
}
