import { useAuth } from "../auth/AuthProvider.tsx";

const TopPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  console.log("Top page", isAuthenticated, isLoading);
  return (
    <>
    <h1>Topページ</h1>
      <div>auth{isAuthenticated ? <p>true</p> : <p>false</p>}</div>
      <div>load{isLoading ? <p>true</p> : <p>false</p>}</div>
    </>
  )
}

export default TopPage;