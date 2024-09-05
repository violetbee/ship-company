import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice"; // Redux selector

function ProtectedRouter({ children }) {
  const userId = useSelector(getUserId); // Kullanıcı ID'sini redux'dan al

  if (!userId) {
    // Eğer kullanıcı ID'si yoksa veya kimlik doğrulama yapılmamışsa
    return <Navigate to="/cvekle" replace />;
  }

  return children;
}

export default ProtectedRouter;

export const ProtectIlanEkle = ({ children }) => {
  const user = useSelector((state) => state.user);

  // Kullanıcının yetkili olup olmadığını kontrol et
  const isAuthenticated = user.status === "authenticated";
  const isSuperUser = user.role === "superUser";
  const isSiteAdmin = user.role === "siteAdmin";

  if (!isAuthenticated || (!isSuperUser && !isSiteAdmin)) {
    // Eğer kullanıcı yetkili değilse veya uygun role sahip değilse, ana sayfaya yönlendir
    return <Navigate to="/" />;
  }

  return children;
};
