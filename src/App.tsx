import React from "react"
import {BrowserRouter, Routes, Route, Navigate, createBrowserRouter, RouterProvider} from "react-router-dom";

import Layout from "@/components/layout/layout";
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
import Brand, {brandLoader} from "@/routes/brand";
import ProductActions from "@/routes/product-actions";
import OrderActions from "@/routes/order-actions";
import AnalyticsProduct from "@/routes/analytics-product";

function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginForm />
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "analytics",
          children: [
            {
              path: "",
              element: <Navigate to="/analytics/earnings" />
            },
            {
              path: ":stage",
              element: <Analytics />
            },
            {
              path: "product",
              element: <Navigate to="/analytics" />
            },
            {
              path: "product/:productId",
              element: <AnalyticsProduct />
            }
          ]
        },
        {
          path: "brand",
          element: <Brand />,
          loader: brandLoader()
        },
        {
          path: "orders",
          children: [
            {
              path: "",
              element: <Orders />
            },
            {
              path: "create",
              element: <OrderActions />
            },
            {
              path: "edit/:orderId",
              element: <OrderActions />
            },
            {
              path: "edit",
              element: <Navigate to="/orders" />
            }
          ]
        },
        {
          path: "settings",
          element: <Settings />,
          children: [
            {
              path: "",
              element: <Navigate to="general" />
            },
            {
              path: "general",
              element: <SettingsGeneral />
            },
            {
              path: "billing",
              element: <SettingsBilling />
            },
            {
              path: "security",
              element: <SettingsSecurity />
            },
            {
              path: "support",
              element: <SettingsSupport />
            }
          ]
        },
        {
          path: "products",
          children: [
            {
              path: "",
              element: <Products />
            },
            {
              path: "edit/:productId",
              element: <ProductActions />
            },
            {
              path: "edit",
              element: <Navigate to="/products" />
            },
            {
              path: "add",
              element: <ProductActions />
            }
          ]
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )

  /*
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics">
            <Route index element={<Analytics />} />
            <Route path=":stage" element={<Analytics />} />
            <Route path="product" element={<Navigate to="/analytics"/>} />
            <Route path="product/:productId" element={<AnalyticsProduct />} />
          </Route>
          <Route path="brand" element={<Brand />} loader={ async ({ params }) => {
            return { data: "asd" }
          }} />
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
  */
}

export default App

