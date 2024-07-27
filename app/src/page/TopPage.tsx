import { Link } from "react-router-dom";
import Logo from "../assets/merumeru_logo_1.png";

function TopPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full mx-5">
        <img className="w-64 mx-auto mb-12" src={Logo} alt="" />
        <Link to="/sign-in">
          <button className="btn btn-Secondary w-full">ログインはこちら</button>
        </Link>
        <Link to="/sign-up">
          <button className="btn btn-Secondary w-full">サインアップはこちら</button>
        </Link>
      </div>
      <div className="fixed bottom-12">
        <div className="w-64 text-sm text-Gray-5 text-center">
          Copyright © 2024 Chocotto-Jagalico All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default TopPage;
