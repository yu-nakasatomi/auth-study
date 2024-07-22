import { FC } from "react";
import { useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { type SignInInput } from "aws-amplify/auth";
import { useAuth } from "../auth/AuthProvider";

const SignInPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { isAuthenticated, handleSignIn, handleSignOut } = useAuth();

  const sampleSignIn: SignInInput = {
    username: "yudai623@gmail.com",
    password: "Asdf-123456"
  }

  const signIn = async (data) => {
    const signInInput: SignInInput = {
      username: data.email,
      password: data.password
    }
    const result = await handleSignIn(signInInput);
    if (result.success) {
      alert("ログインしました");
      // navigate('/');
    }
    else {
      if (result.message === 'CONFIRM_SIGN_UP') {
        navigate('/confirm', {state: {username: sampleSignIn.username}});
      }
      alert(result.message);
    }
  }

  const signOut = async () => {
    const result = await handleSignOut();
    if (result.success) {
      alert("ログアウトしました")
      navigate('/');
    } else {
      alert(result.message);
    }
  }

  return (
    <>
      <h1>ログインページ</h1>
      {isAuthenticated ? (
        <div>
          <p>ログイン済みです。</p>
          <button onClick={signOut}>ログアウト</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(signIn)}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" {...register('email', { required: true })} />
            {errors.email && <div>入力が必須の項目です</div>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" {...register('password')} type="password" />
          </div>
          <button type="submit">ログイン</button>
        </form>
      )}
    </>
  )
}

export default SignInPage;