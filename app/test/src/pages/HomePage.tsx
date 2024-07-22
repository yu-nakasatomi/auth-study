import PrivateRoute from "../utils/PrivateRoute.tsx";

const HomePage = () => {
  return (
    <>
      <PrivateRoute>
        <h1>ホームページ</h1>
        <p>ログインしているユーザーのみ表示されるページです</p>
      </PrivateRoute>
    </>
  )
}

export default HomePage;