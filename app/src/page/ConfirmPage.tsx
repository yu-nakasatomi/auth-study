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
  const { handleConfirm } = useAuth();

  useEffect(() => {
    if (!location.state) navigate('/');
    else setUsername(location.state.username);
  }, [location.state])

  const confirm = async (data:any) => {
    const confirmInput: ConfirmSignUpInput = {
      confirmationCode: data.code,
      username: username
    }
    const result = await handleConfirm(confirmInput);
    if (result.success) {
      alert("確認完了しました");
      navigate('/sign-in');
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full mx-5">
        <h1 className="text-[22px] text-center text-SecondaryDark">確認コード入力ページ</h1>
        <p>確認コードを入力してください</p>
        <p>メールアドレス: {username}</p>
      <form onSubmit={handleSubmit(confirm)}>
          <label className="text-sm pl-0.5 text-SecondaryDark">確認コード</label>
          <input id="code" {...register('code', { required: true })}
            className="w-full border border-Gray-3 rounded-md py-2 px-3 mt-[10px] text-SecondaryDark"/>
          {errors.code && <div>入力が必須の項目です</div>}
          <button type="submit" className="btn btn-Secondary w-full">確認</button>
        </form>
      </div>
    </div>
  )
}

export default ConfirmPage;