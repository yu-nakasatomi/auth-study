import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { type SignInInput } from "aws-amplify/auth";
import { useAuth } from "../auth/AuthProvider";

const SignInPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>();
  const navigate = useNavigate();
  const { isAuthenticated, handleSignIn, handleSignOut } = useAuth();

  const signIn = async (data: SignInInput) => {
    const signInInput: SignInInput = {
      username: data.username,
      password: data.password,
    };
    const result = await handleSignIn(signInInput);
    if (result.success) {
      alert("ログインしました");
      navigate("/loading");
    } else {
      if (result.message === "CONFIRM_SIGN_UP") {
        navigate("/confirm", { state: { username: signInInput.username } });
      }
      alert(result.message);
    }
  };

  const signOut = async () => {
    const result = await handleSignOut();
    if (result.success) {
      alert("ログアウトしました");
      navigate("/");
    } else {
      alert(result.message);
    }
  };

  // パスワードの文字の表示・非表示
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full mx-5">
          {isAuthenticated ? (
            <div>
              <p className="text-center text-SecondaryDark">
                ログイン済みです。
              </p>
              <button className="btn btn-Secondary" onClick={signOut}>
                ログアウト
              </button>
            </div>
          ) : (
            <div>
              <h1 className="text-[22px] text-center text-SecondaryDark">
                ログイン
              </h1>
              <form onSubmit={handleSubmit(signIn)}>
                <div className="mt-5">
                  <label
                    className="text-sm pl-0.5 text-SecondaryDark"
                    htmlFor="email">
                    メールアドレス
                  </label>
                  <input
                    id="username"
                    className="w-full border border-Gray-3 rounded-md py-2 px-3 mt-[10px] text-SecondaryDark"
                    {...register("username", { required: true })}
                    placeholder="email@example.com"
                  />
                  {errors.username && (
                    <div className="text-Secondary text-sm pl-0.5 mt-1">
                      入力が必須の項目です
                    </div>
                  )}
                </div>
                <div className="mt-5">
                  <label
                    className="text-sm pl-0.5 text-SecondaryDark"
                    htmlFor="password"
                  >
                    パスワード
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      {...register("password")}
                      className="w-full border border-Gray-3 rounded-md py-2 px-3 mt-[10px] text-SecondaryDark"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-[18px] p-1.5"
                    >
                      <svg
                        className="flex-shrink-0 size-3.5 text-Gray-5"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          className={
                            !passwordVisible ? "hs-password-active" : "hidden"
                          }
                          d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                        ></path>
                        <path
                          className={
                            !passwordVisible ? "hs-password-active" : "hidden"
                          }
                          d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                        ></path>
                        <path
                          className={
                            !passwordVisible ? "hs-password-active" : "hidden"
                          }
                          d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                        ></path>
                        <line
                          className={
                            !passwordVisible ? "hs-password-active" : "hidden"
                          }
                          x1="2"
                          x2="22"
                          y1="2"
                          y2="22"
                        ></line>
                        <path
                          className={
                            !passwordVisible ? "hidden" : "hs-password-active"
                          }
                          d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                        ></path>
                        <circle
                          className={
                            !passwordVisible ? "hidden" : "hs-password-active"
                          }
                          cx="12"
                          cy="12"
                          r="3"
                        ></circle>
                      </svg>
                    </button>
                  </div>

                  {errors.password && (
                    <div className="text-Secondary text-sm">
                      8文字以上、かつ、大文字・小文字・数字・記号のうち2種類以上
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-Secondary w-full">
                  ログイン
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignInPage;
