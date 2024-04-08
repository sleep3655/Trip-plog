import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";

import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { HashRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Router>
);
