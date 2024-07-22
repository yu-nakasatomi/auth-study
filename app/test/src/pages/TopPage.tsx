import { useAuth } from "../auth/AuthProvider.tsx";

const TopPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  return (
    <>
      <h1>Topページ</h1>
      <table border="1">
        <tbody>
        <tr>
          <td>Loading</td>
          {isLoading ? <td>true</td> : <td>false</td>}
        </tr>
        <tr>
          <td>Authenticated</td>
          {isAuthenticated ? <td>true</td> : <td>false</td>}
        </tr>
        </tbody>
      </table>
    </>
  )
}

export default TopPage;