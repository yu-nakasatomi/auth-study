import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { type SignUpInput } from "aws-amplify/auth";
import { useAuth } from "../auth/AuthProvider.tsx";

const SignUpPage: FC = () => {
  const { register, handleSubmit, formState: { errors }} = useForm();
  const navigate = useNavigate();
  const { isAuthenticated, handleSignUp } = useAuth();

  const signUp = async (data:any) => {
    const signUpInput: SignUpInput = {
      username: data.username,
      password: data.password
    }
    const result = await handleSignUp(signUpInput);
    if (result.success) {
      navigate('/confirm', {state: {username: signUpInput.username}});
    }
  }

  return (
    isAuthenticated ? (
      <div>
        <p className="text-center text-SecondaryDark">サインアップ済みです</p>
      </div>
    ) :
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full mx-5">
        <h1 className="text-[22px] text-center text-SecondaryDark">サインアップ</h1>
        <form onSubmit={handleSubmit(signUp)}>
          <label htmlFor="email" className="text-sm pl-0.5 text-SecondaryDark">メールアドレス</label>
          <input id="username" {...register('username', {required: true})}
            className="w-full border border-Gray-3 rounded-md py-2 px-3 mt-[10px] text-SecondaryDark"/>
          {errors.username && <div>入力が必須の項目です</div>}
          <label htmlFor="password" className="text-sm pl-0.5 text-SecondaryDark">パスワード</label>
          <input id="password" type="text" {...register('password')} 
            className="w-full border border-Gray-3 rounded-md py-2 px-3 mt-[10px] text-SecondaryDark"/>
          <button type="submit" className="btn btn-Secondary w-full">サインアップする</button>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage;