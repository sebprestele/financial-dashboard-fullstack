import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Expense from "./components/Expense/Expense";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/dashboard/:username"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expense/:username"
            element={
              <ProtectedRoute>
                <Expense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolio/:username"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budget/:username"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/:username"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
