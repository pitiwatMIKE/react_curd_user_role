import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search/:search/page/:page" element={<HomePage />} />
          <Route path="/page/:page" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Layout>
    </>
  );
}
