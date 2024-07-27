import { FC } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>404 Not Found</h1>
      <h1>存在しないページです</h1>

      <button className="btn btn-Secondary" onClick={()=>navigate('/')}>
        トップへ戻る
      </button>
    </>
  );
};

export default NotFoundPage;
