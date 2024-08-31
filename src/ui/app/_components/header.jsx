import { NavLink, useLocation } from "react-router-dom";
import { Button } from "../../Button";
import SubHeader from "./sub-header";
import { useSelector } from "react-redux";
import { logout } from "../../../services/postAPI";
import { store } from "../../../store";

function Header() {
  const { pathname } = useLocation();
  const auth = useSelector((state) => state.user.status);
  const isAuth = auth === "authenticated";

  const userRole = useSelector((state) => state.user.role);
  const isSuperUser = userRole === "superUser";

  const handleLogout = async () => {
    const error = await logout();
  };

  return (
    <header className="bg-[#171923]">
      <div className="container flex h-24 items-center justify-between">
        <h1 className="p-4 text-2xl font-bold text-white">
          Güven Crewing Agency
        </h1>
        <nav className="flex h-full items-center gap-4 text-white">
          <NavLink
            className={({ isActive }) =>
              `hover:border-white flex h-full items-center justify-center border-b-4 border-transparent px-4 duration-200 ${
                isActive ? "border-white" : ""
              }`
            }
            to="/"
          >
            Ana Sayfa
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `hover:border-white flex h-full items-center justify-center border-b-4 border-transparent px-4 duration-200 ${
                isActive ? "border-white" : ""
              }`
            }
            to="/hakkimizda"
          >
            Hakkımızda
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `hover:border-white flex h-full items-center justify-center border-b-4 border-transparent px-4 duration-200 ${
                isActive ? "border-white" : ""
              }`
            }
            to="/hizmetler"
          >
            İş İlanları
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `hover:border-white flex h-full items-center justify-center border-b-4 border-transparent px-4 duration-200 ${
                isActive ? "border-white" : ""
              }`
            }
            to="/iletisim"
          >
            İletişim
          </NavLink>
          {isSuperUser && (
            <NavLink
              className={({ isActive }) =>
                `hover:border-white flex h-full items-center justify-center border-b-4 border-transparent px-4 duration-200 ${
                  isActive ? "border-white" : ""
                }`
              }
              to="/ilanolustur"
            >
              Ilan Olustur
            </NavLink>
          )}
          {isAuth && (
            <NavLink
              className={({ isActive }) =>
                `hover:border-white flex h-full items-center justify-center border-b-4 border-transparent px-4 duration-200 ${
                  isActive ? "border-white" : ""
                }`
              }
              to="/profile"
            >
              Profil
            </NavLink>
          )}
        </nav>
        <div className="space-x-3">
          {isAuth ? (
            <NavLink to="login">
              <Button onClick={handleLogout} variant="secondary">
                Çıkış Yap
              </Button>
            </NavLink>
          ) : (
            <>
              <NavLink to="login">
                <Button variant="secondary">Giriş Yap</Button>
              </NavLink>
              <NavLink to="signup">
                <Button className="text-white" variant="link">
                  Kayıt Ol
                </Button>
              </NavLink>
            </>
          )}
        </div>
      </div>
      <div className="h-[2px] w-full bg-[#1d202c]" />
      {pathname !== "/ilanolustur" &&
        pathname !== "/profile" &&
        pathname !== "/signup" &&
        pathname !== "/login" && <SubHeader />}
    </header>
  );
}

export default Header;
