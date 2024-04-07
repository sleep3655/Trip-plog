import { Layout } from "./pages/Layout.jsx";
import ViewList from "./pages/ViewList.jsx";
import DeleteList from "./pages/DeleteList.jsx";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="management/list" element={<ViewList />} />
        <Route path="management/delete" element={<DeleteList />} />
      </Routes>
    </Layout>
  );
}

export default App;
