import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./ui/app/appLayout";
import Home from "./pages/MainPage";
import JobForm from "./ui/Form";
import CvForm from "./ui/FormCV";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // <-- Add this import
import DetailPage from "./pages/DetailPage";
import LoginForm from "./ui/LoginForm";
import Signup from "./ui/Signup";

import { useEffect } from "react";
import { getSession } from "./services/getAPI";
import ProfilePage from "./pages/ProfilePage";

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
            <Route path="cvekle" element={<CvForm />} />
            <Route path="ilanlar/:id" element={<DetailPage />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
