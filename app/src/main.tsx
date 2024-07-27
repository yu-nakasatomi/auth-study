import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Amplify } from "aws-amplify";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { authConfig } from "./auth/auth-config.ts";
import { sessionStorage } from "aws-amplify/utils";

import AuthProvider from "./auth/AuthProvider.tsx";
import TopPage from "./page/TopPage.tsx";
import SignUpPage from "./page/SignUpPage.tsx";
import ConfirmPage from "./page/ConfirmPage.tsx";
import SignInPage from "./page/SignInPage.tsx";
import ProfileRegisterPage from "./page/ProfileRegisterPage.tsx";
import LoadingPage from "./page/LoadingPage.tsx";
import NotFoundPage from "./page/NotFoundPage.tsx";

Amplify.configure(authConfig);
cognitoUserPoolsTokenProvider.setKeyValueStorage(sessionStorage);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<TopPage />}></Route>
      <Route path="/sign-in" element={<SignInPage />}></Route>
      <Route path="/sign-up" element={<SignUpPage />}></Route>
      <Route path="/confirm" element={<ConfirmPage />}></Route>
      <Route path="/register" element={<ProfileRegisterPage />}></Route>
      <Route path="/loading" element={<LoadingPage />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
