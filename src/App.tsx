import React from "react"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Layout from "@/components/app/layout";
import Orders from "@/routes/orders";
import Dashboard from "@/routes/dashboard";
import Products from "@/routes/products";
import LoginForm from "@/routes/login";
import Settings from "@/routes/settings";
import SettingsGeneral from "@/routes/settings/settings-general";
import SettingsBilling from "@/routes/settings/settings-billing";
import SettingsSecurity from "@/routes/settings/settings-security";
import SettingsSupport from "@/routes/settings/settings-support";
import Analytics from "@/routes/analytics";
import Brand from "@/routes/brand";
import ProductActions from "@/routes/product-actions";
import OrderActions from "@/routes/order-actions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="brand" element={<Brand />} />
          <Route path="orders">
            <Route index element={<Orders />}/>
            <Route path="create" element={<OrderActions />}/>
            <Route path="edit/:orderId" element={<OrderActions />}/>
            <Route path="edit" element={<Navigate to="/orders" />} />
          </Route>
          <Route path="settings" element={<Settings />}>
            <Route index element={<Navigate to="general"/>} />
            <Route path="general" element={<SettingsGeneral/>} />
            <Route path="billing" element={<SettingsBilling/>} />
            <Route path="security" element={<SettingsSecurity/>} />
            <Route path="support" element={<SettingsSupport/>} />
          </Route>
          <Route path="products">
            <Route index element={<Products />} />
            <Route path="edit/:productId" element={<ProductActions />} />
            <Route path="edit" element={<Navigate to="/products" />} />
            <Route path="add" element={<ProductActions />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

