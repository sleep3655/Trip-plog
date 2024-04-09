import { Layout } from "./pages/Layout.jsx";
import ViewList from "./pages/ViewList.jsx";
import DeleteList from "./pages/DeleteList.jsx";
// import PlogList from "./pages/PlogList.jsx";
import Login from "./pages/Login.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Layout>
      <Routes>
        {/* <Route path="management/list" element={<PlogList />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="management/view" element={<ViewList />} />
        <Route path="management/delete" element={<DeleteList />} />
      </Routes>
    </Layout>
  );
}

export default App;
