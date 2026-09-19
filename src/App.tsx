import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { AllInOne } from "./pages/AllInOne";
import { Notification } from "./pages/Notification";
import { PatientInfo } from "./pages/PatientInfo";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Main />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-in-one"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllInOne />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <Layout>
                  <Notification />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient-info"
            element={
              <ProtectedRoute>
                <Layout>
                  <PatientInfo />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
