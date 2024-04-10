import { Layout } from "./pages/Layout.jsx";
import ViewList from "./pages/ViewList.jsx";
import DeleteList from "./pages/DeleteList.jsx";
import Login from "./pages/Login.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// // 移除哈希值的逻辑
// if (window.location.hash) {
//   history.replaceState(
//     null,
//     document.title,
//     window.location.href.split("#")[0]
//   );
// }

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="login" element={<Login />} />
      <Route path="management" element={<Layout />}>
        <Route path="view" element={<ViewList />} />
        <Route path="delete" element={<DeleteList />} />
      </Route>
    </Routes>
    // <Layout>
    //   <Routes>
    //     {/* 其他路由规则 */}
    //     {/* <Route path="login" element={<Login />} /> */}
    //     <Route path="/management/view" element={<ViewList />} />
    //     <Route path="/management/delete" element={<DeleteList />} />
    //   </Routes>
    // </Layout>
  );
}

export default App;
