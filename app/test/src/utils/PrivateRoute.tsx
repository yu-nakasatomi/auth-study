import { Navigate } from "react-router-dom";
import { useAuth} from "../auth/AuthProvider.tsx";

const PrivateRoute = ({ children }) => {
  const {isAuthenticated, isLoading} = useAuth();
  if (isLoading) {
    return <p>Loading...</p>
  }
  else {
    return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" />;
  }
};

export default PrivateRoute;