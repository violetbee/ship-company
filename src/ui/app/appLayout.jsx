import "../../../src/index.css";
import Header from "./_components/header";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div className="font-sans bg-[#f0f0f0] antialiased">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
