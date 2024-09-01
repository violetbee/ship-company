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

  if (user.status !== "authenticated" || user.role !== "superUser") {
    // Eğer kullanıcı yetkili değilse, giriş sayfasına yönlendir
    return <Navigate to="/" />;
  }

  return children;
};
