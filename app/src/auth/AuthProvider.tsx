import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  Context,
} from "react";
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  fetchAuthSession,
  type SignUpInput,
  type ConfirmSignUpInput,
  type SignInInput,
  JWT,
} from "aws-amplify/auth";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL; // 設定された環境変数のURLを使用

const stub = (): never => {
  throw new Error("Error: wrap your component in <AuthProvider>.");
};

export type Result = {
  success: boolean;
  message: string;
};

export type Profile = {
  sub?: string;
  skill_id: string;
  department_id: string;
  certification_id: string;
  name: string;
  hobby: string;
  message: string;
  image_path?: string;
  background_path?: string;
};

export type AuthContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  userId: string | null;
  idToken: JWT | undefined;
  handleProfileRegister: (data: Profile) => Promise<Result>;
  handleSignUp: (input: SignUpInput) => Promise<Result>;
  handleConfirm: (input: ConfirmSignUpInput) => Promise<Result>;
  handleSignIn: (input: SignInInput) => Promise<Result>;
  handleSignOut: () => Promise<Result>;
};

const InitialAuthContext: AuthContextType = {
  isLoading: true,
  isAuthenticated: false,
  userId: null,
  idToken: undefined,
  handleProfileRegister: stub,
  handleSignUp: stub,
  handleConfirm: stub,
  handleSignIn: stub,
  handleSignOut: stub,
};

const AuthContext: Context<AuthContextType> = createContext(InitialAuthContext);
export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<JWT | undefined>(undefined);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      console.log("checkAuth");
      setIsLoading(true);
      try {
        const { userSub, tokens } = await fetchAuthSession();
        if (userSub && tokens) {
          setIsAuthenticated(true);
          setIdToken(tokens.idToken);
          setUserId(await fetchUserId(tokens.idToken));
        } else {
          setIsAuthenticated(false);
        }
      } catch (error: any) {
        setIsAuthenticated(false);
        console.error("認証チェック時にエラーが発生しました:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [isAuthenticated, userId]);

  const fetchUserId = async (idToken: JWT | undefined): Promise<string | null> => {
    try {
      const response = await axios.get(apiUrl + "/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${idToken}`,
        },
      });
      return response.data.id;
    } catch (error) {
      console.error("ユーザーIDの取得時にエラーが発生しました:", error);
      return null;
    }
  };

  const handleProfileRegister = async (data :Profile) => {
    try {
      const response = await axios.post(apiUrl + "/profile", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${idToken}`,
        },
      });
      console.log(response);
      setUserId("");
      return { success: true, message: "" };
    } catch (error:any) {
      console.error("There was an error register profile!", error.response ? error.response.data : error.message);
      return { success: false, message: error.message };
    }
  };

  const handleSignUp = async ({ username, password }: SignUpInput) => {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
      });
      console.log("isSignUpComplete:", isSignUpComplete);
      console.log("userId:", userId);
      console.log("nextStep:", nextStep);
      return { success: true, message: "" };
    } catch (error: any) {
      console.error("error signing up:", error);
      return { success: false, message: error.message };
    }
  };

  const handleSignIn = async ({ username, password }: SignInInput) => {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      if (nextStep.signInStep === "DONE") {
        setIsAuthenticated(isSignedIn);
        return { success: true, message: "" };
      } else {
        return { success: false, message: nextStep.signInStep };
      }
    } catch (error: any) {
      switch (error.name) {
        case "UserAlreadyAuthenticatedException":
          console.warn("User already authenticated", error.message);
          return { success: true, message: error.message };
        default:
          console.error("Error signing in:", error);
          setIsAuthenticated(false);
          return { success: false, message: error.message };
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({ global: true });
      setIsAuthenticated(false);
      return { success: true, message: "" };
    } catch (error: any) {
      console.error("Error signing out: ", error);
      return { success: false, message: error.message };
    }
  };

  const handleConfirm = async ({
    username,
    confirmationCode,
  }: ConfirmSignUpInput) => {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });
      console.log("isSignUpComplete:", isSignUpComplete);
      console.log("nextStep:", nextStep);
      return { success: true, message: "" };
    } catch (error: any) {
      console.error("Error confirming sign up", error);
      return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        idToken,
        userId,
        handleProfileRegister,
        handleSignUp,
        handleSignIn,
        handleSignOut,
        handleConfirm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
