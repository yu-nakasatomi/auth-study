import {createContext, useContext, useState, useEffect, Context} from "react";
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  fetchAuthSession,
  type SignUpInput,
  type ConfirmSignUpInput,
  type SignInInput
} from 'aws-amplify/auth';

export type Result = {
  success: boolean;
  message: string;
}

const stub = (): never => {
  throw new Error(
    "Error: wrap your component in <AuthProvider>."
  );
};

export type AuthContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  handleSignUp: (input: SignUpInput) => Promise<Result>;
  handleConfirm: (input: ConfirmSignUpInput) => Promise<Result>;
  handleSignIn: (input: SignInInput) => Promise<Result>;
  handleSignOut: () => Promise<Result>;
}

const InitialAuthContext: AuthContextType = {
  isLoading: true,
  isAuthenticated: false,
  handleSignUp: stub,
  handleConfirm: stub,
  handleSignIn: stub,
  handleSignOut: stub,
}

const AuthContext: Context<AuthContextType> = createContext(InitialAuthContext);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isProfileRegistered, setIsProfileRegistered] = useState(false);
  // const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    checkAuthenticated().then(r => console.log("check authenticated"));
    // checkProfileRegistered().then(r => console.log("check profile registered"));
  }, [])

  const checkAuthenticated = async () => {
    const {userSub, tokens} = await fetchAuthSession();
    setIsLoading(false);
    if (userSub && tokens) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }

  // TO DO
  // const checkProfileRegistered = async (idToken) => {
    // GET /profile(with idToken)で自身のプロフィール情報を取得できるか確認
    // (TBD) const userId = await axios.get('/profile');的な
    // if (userId) { userIdを取得できる=プロフィール登録済みの場合
    // setUserId(userId);
    // setIsProfileRegistered(true);
  // }

  const handleSignUp = async ({username, password}: SignUpInput) => {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
      });
      console.log('isSignUpComplete:', isSignUpComplete);
      console.log('userId:', userId);
      console.log('nextStep:', nextStep);
      return { success: true, message: "" };
    } catch (error) {
      console.error('error signing up:', error);
      return { success: false, message: error.message };
    }
  }

  const handleSignIn = async ({ username, password }: SignInInput) => {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      if (nextStep.signInStep === 'DONE') {
        setIsAuthenticated(isSignedIn);
        return { success: true, message: "" };
      } else {
        return { success: false, message: nextStep.signInStep};
      }
    } catch (error) {
      switch (error.name) {
        case 'UserAlreadyAuthenticatedException':
          console.warn('User already authenticated', error.message);
          return { success: true, message: error.message };
        default:
          console.error('Error signing in:', error);
          setIsAuthenticated(false);
          return { success: false, message: error.message };
      }
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut({ global: true });
      setIsAuthenticated(false);
      return { success: true, message: "" };
    } catch (error) {
      console.error('Error signing out: ', error);
      return { success: false, message: error.message };
    }
  }

  const handleConfirm = async ({username, confirmationCode}: ConfirmSignUpInput) => {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({username, confirmationCode });
      return { success: true, message: "" };
    } catch (error) {
      console.error('Error confirming sign up', error);
      return { success: false, message: error.message };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        handleSignUp,
        handleSignIn,
        handleSignOut,
        handleConfirm
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
