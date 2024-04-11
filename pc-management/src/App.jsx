import { Layout } from "./pages/Layout.jsx";
import ViewList from "./pages/ViewList.jsx";
import DeleteList from "./pages/DeleteList.jsx";
import Details from "./pages/Details.jsx";
import LoginPage from "./pages/LoginPage.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="" element={<LoginPage />} />
      <Route path="management" element={<Layout />}>
        <Route path="view" element={<ViewList />} />
        <Route path="delete" element={<DeleteList />} />
        <Route path="details/:id" element={<Details />} />
      </Route>
    </Routes>
  );
}

export default App;
