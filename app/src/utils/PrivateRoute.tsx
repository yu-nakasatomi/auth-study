import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Hearts } from 'react-loader-spinner'
import { useAuth } from "../auth/AuthProvider";

const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading, userId, idToken } = useAuth();
  console.log("-----------------------------");
  console.log("PrivateRoute");
  console.log("isLoading:", isLoading);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("userId:", userId);
  console.log("idToken:", idToken);
  console.log("-----------------------------");

  if (isLoading) {
    return <>
      <Hearts 
      height="80"
      width="80"
      color="#BE123C"
      ariaLabel="hearts-loading"
      wrapperStyle={{}}
      wrapperClass="h-screen w-screen flex justify-center items-center"
      visible={true}
      />
    </>;
  } else if (isAuthenticated && userId === null) {
    return <Navigate to="/register" state={true} />;
  } else {
    return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" />;
  }
};

export default PrivateRoute;
