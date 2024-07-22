import { FC, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { type ConfirmSignUpInput } from "aws-amplify/auth";
import {useAuth} from "../auth/AuthProvider.tsx";

const ConfirmPage:FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const { handleConfirmation } = useAuth();

  useEffect(() => {
    if (!location.state) navigate('/');
    else setUsername(location.state.username);
  }, [location.state])

  const confirm = async (data) => {
    const confirmInput: ConfirmSignUpInput = {
      confirmationCode: data.code,
      username: username
    }
    const result = await handleConfirmation(confirmInput);
    if (result.success) {
      alert("確認完了しました");
      navigate('/');
    }
  }

  return (
    <>
      <h1>確認コード入力ページ</h1>
      <p>確認コードを入力してください</p>
      <p>username: {username}</p>
      <form onSubmit={handleSubmit(confirm)}>
        <div>
          <label>確認コード</label>
          <input id="code" {...register('code', { required: true })} />
          {errors.code && <div>入力が必須の項目です</div>}
        </div>
        <button type="submit">確認</button>
      </form>
    </>
  )
}

export default ConfirmPage;