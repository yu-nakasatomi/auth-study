import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { type SignUpInput } from "aws-amplify/auth";
import { useAuth } from "../auth/AuthProvider.tsx";

const sample: SignUpInput = {
  password: "Asdf-123456",
  username: "yudai623@gmail.com",
}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { handleSignUp } = useAuth();

  const signUp = async (data) => {
    const signUpInput: SignUpInput = {
      username: data.email,
      password: data.password
    }
    const result = await handleSignUp(signUpInput);
    if (result.success) {
      navigate('/confirm', {state: {username: signUpInput.username}});
    }
  }
  return (
    <>
      <h1>サインアップページ</h1>
      <form onSubmit={handleSubmit(signUp)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" {...register('email', {required: true})} />
          {errors.email && <div>入力が必須の項目です</div>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" {...register('password')} type="password"/>
        </div>
        <button type="submit">登録</button>
      </form>
    </>
  )
}

export default SignUpPage;