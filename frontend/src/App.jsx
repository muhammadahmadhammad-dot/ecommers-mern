import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layouts/Layout";
import { Home } from "./Pages";
import DashboardLayout from "./Pages/Layouts/DashboardLayout";
import { Dashboard, AuthLogin } from "./Pages/Dashboard";
import ProtectAdminPage from "./Pages/Dashboard/ProtectAdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/dashboard/login" element={<AuthLogin />} />
        <Route path="" element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectAdminPage>
                <Dashboard />
              </ProtectAdminPage>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
