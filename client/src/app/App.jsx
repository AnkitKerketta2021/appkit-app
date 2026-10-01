import { Route, Routes } from "react-router";

import AppLayout from "../components/layout/AppLayout";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import PublicRoute from "../components/layout/PublicRoute";

import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import Features from "../pages/Features/Features";
import Pricing from "../pages/Pricing/Pricing";
import Blog from "../pages/Blog/Blog";
import Dashboard from "../pages/Dashboard/Dashboard";
import Product from "../pages/Product/Product";
import More from "../pages/More/More";
import NotFound from "../pages/NotFound/NotFound";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product" element={<Product />} />
            <Route path="/more" element={<More />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
