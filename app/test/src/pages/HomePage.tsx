import PrivateRoute from "../utils/PrivateRoute.tsx";

const HomePage = () => {
  return (
    <>
      <PrivateRoute>
        <h1>ホームページ</h1>
      </PrivateRoute>
    </>
  )
}

export default HomePage;