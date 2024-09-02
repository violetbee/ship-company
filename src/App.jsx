import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./ui/app/appLayout";
import Home from "./pages/MainPage";
import JobForm from "./ui/Form";
import CvForm from "./ui/FormCV";
import { useQuery } from "@tanstack/react-query";

import DetailPage from "./pages/DetailPage";
import LoginForm from "./ui/LoginForm";
import Signup from "./ui/Signup";

import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import PrivateRoute from "./pages/PrivateRoute";
import JobPage from "./pages/JobPage";
import { ProtectIlanEkle } from "./pages/ProtectedRouter";
import Spinner from "./ui/Spinner";
import { getSession } from "./services/getAPI";
import CVDetailsPage from "./pages/CVDetailsPage";

function App() {
  const { isLoading: loading } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route
            path="ilanolustur"
            element={
              <ProtectIlanEkle>
                <JobForm />
              </ProtectIlanEkle>
            }
          />
          <Route path="ilanlar/:id" element={<DetailPage />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>Page Not Found</div>} />
          <Route
            path="login"
            element={
              <PrivateRoute>
                <LoginForm />
              </PrivateRoute>
            }
          />
          <Route
            path="signup"
            element={
              <PrivateRoute>
                <Signup />
              </PrivateRoute>
            }
          />
          <Route path="hizmetler" element={<JobPage />} />
        </Route>
        <Route
          path="cvekle"
          element={
            <ProtectedRoute>
              <CvForm />
            </ProtectedRoute>
          }
        />
        <Route path="id/:id" element={<CVDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
