import React, {createContext, useContext, useState, useEffect, Context} from "react";
import { signUp, signIn, confirmSignUp, type ConfirmSignUpInput, type SignInInput, signOut } from 'aws-amplify/auth';
import { fetchAuthSession } from "aws-amplify/auth";

type Result = {
  success: boolean;
  message: string;
}

export type SignUpParameters = {
  username: string;
  password: string;
};

const stub = (): never => {
  throw new Error(
    "You forgot to wrap your component in <AuthProvider>."
  );
};

export type AuthContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  handleSignUp: (input: SignUpParameters) => Promise<Result>;
  handleSignIn: (input: SignInInput) => Promise<Result>;
  handleSignOut: () => Promise<Result>;
  handleConfirmation: (input: ConfirmSignUpInput) => Promise<Result>;
}

const InitialAuthContext: AuthContextType = {
  isLoading: true,
  isAuthenticated: false,
  handleSignUp: stub,
  handleSignIn: stub,
  handleSignOut: stub,
  handleConfirmation: stub,
}

const AuthContext:Context<AuthContextType> = createContext(InitialAuthContext);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileRegistered, setIsProfileRegistered] = useState(false);

  useEffect(() => {
    checkAuthenticated().then(r => console.log("check authenticated"));
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

  const checkProfileRegistered = async () => {
    // API GET /profile で自身のプロフィール情報を取得できるかで判断
    setIsProfileRegistered(true);
  }

  const handleSignUp = async ({username, password}: SignUpParameters) => {
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
          return { success: true, message: error.message };
        default:
          console.error('error signing in:', error);
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
      console.error('error signing out: ', error);
      return { success: false, message: error.message };
    }
  }

  const handleConfirmation = async ({username, confirmationCode}: ConfirmSignUpInput) => {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({username, confirmationCode });
      return { success: true, message: "" };
    } catch (error) {
      console.log('error confirming sign up', error);
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
        handleConfirmation
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
