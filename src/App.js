import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </>
  );
}
