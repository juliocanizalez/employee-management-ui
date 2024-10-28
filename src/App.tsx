import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import EmployeePage from "@/pages/employee";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<EmployeePage />} path="/employee" />
    </Routes>
  );
}

export default App;
