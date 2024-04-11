import { Layout } from "./pages/Layout.jsx";
import ViewList from "./pages/ViewList.jsx";
import DeleteList from "./pages/DeleteList.jsx";
import Details from "./pages/Details.jsx";
import Login from "./pages/Login.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="login" element={<Login />} />
      <Route path="management" element={<Layout />}>
        <Route path="view" element={<ViewList />} />
        <Route path="delete" element={<DeleteList />} />
        <Route path="details/:id" element={<Details />} />
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
