export const authConfig = {
  Auth: {
    Cognito: {
      //ユーザープールID
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      // クライアントID
      userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
      loginWith: {
        oauth: {
          // Cognitoドメイン(XXXX => 作成したドメイン名を挿入)
          domain: import.meta.env.VITE_COGNITO_DOMAIN,
          scopes: ["openid", "email", "profile"],
          //ログイン後、リダイレクトするurl
          redirectSignIn: ["http://localhost:5173/"],
          //ログアウト後、リダイレクトするurl
          redirectSignOut: ["http://localhost:5173/"],
          responseType: "code",
          // providers: ["Google", { custom: "Line" }], //後述(ソーシャルログイン)
        }
      }
    }
  }
};