import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layouts/Layout";
import { BuyNowCheckout, Cart, Checkout, Home, SingleProduct } from "./Pages";
import DashboardLayout from "./Pages/Layouts/DashboardLayout";
import {
  Dashboard,
  AuthLogin,
  CreateCategory,
  Category,
  EditCategory,
  Product,
  CreateProduct,
  EditProduct,
  ShowOrder,
  Order,
} from "./Pages/Dashboard";
import ProtectAdminPage from "./Pages/Dashboard/ProtectAdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop/product-detail/:slug"
            element={<SingleProduct />}
          />
          <Route path="/buy-now-checkout" element={<BuyNowCheckout />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
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
          {/* Category */}
          <Route
            path="/dashboard/category"
            element={
              <ProtectAdminPage>
                <Category />
              </ProtectAdminPage>
            }
          />
          <Route
            path="/dashboard/category/create"
            element={
              <ProtectAdminPage>
                <CreateCategory />
              </ProtectAdminPage>
            }
          />
          <Route
            path="/dashboard/category/edit/:id"
            element={
              <ProtectAdminPage>
                <EditCategory />
              </ProtectAdminPage>
            }
          />
          {/* Product */}
          <Route
            path="/dashboard/product"
            element={
              <ProtectAdminPage>
                <Product />
              </ProtectAdminPage>
            }
          />
          <Route
            path="/dashboard/product/create"
            element={
              <ProtectAdminPage>
                <CreateProduct />
              </ProtectAdminPage>
            }
          />
          <Route
            path="/dashboard/product/edit/:id"
            element={
              <ProtectAdminPage>
                <EditProduct />
              </ProtectAdminPage>
            }
          />
          {/* Order */}
          <Route
            path="/dashboard/order"
            element={
              <ProtectAdminPage>
                <Order />
              </ProtectAdminPage>
            }
          />
          <Route
            path="/dashboard/order/detail/:id"
            element={
              <ProtectAdminPage>
                <ShowOrder />
              </ProtectAdminPage>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
