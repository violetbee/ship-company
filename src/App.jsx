import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./ui/app/appLayout";
import Home from "./pages/MainPage";
import JobForm from "./ui/Form";
import CvForm from "./ui/FormCV";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DetailPage from "./pages/DetailPage";
import LoginForm from "./ui/LoginForm";
import Signup from "./ui/Signup";
import { useEffect } from "react";
import { getSession } from "./services/getAPI";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import PrivateRoute from "./pages/PrivateRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  useEffect(function () {
    async function getSesion() {
      await getSession();
    }

    getSesion();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="ilanolustur" element={<JobForm />} />
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
          </Route>
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
          <Route path="cvekle" element={<CvForm />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
