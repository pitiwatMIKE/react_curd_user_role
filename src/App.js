import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AboutPage from "./pages/AboutPage";
import CreateMyProductPage from "./pages/CreateMyProductPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MyProductsPage from "./pages/MyProductsPage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route path="myproducts" element={<MyProductsPage />} />
            <Route path="myproducts/create" element={<CreateMyProductPage />} />
            <Route path="myproducts/page/:page" element={<MyProductsPage />} />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search/:search/page/:page" element={<HomePage />} />
          <Route path="/page/:page" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Layout>
    </>
  );
}
