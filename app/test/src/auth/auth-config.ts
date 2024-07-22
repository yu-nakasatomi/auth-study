export const authConfig = {
  Auth: {
    Cognito: {
      //ユーザープールID
      userPoolId: String("ap-northeast-1_9w660B4v6"),
      // クライアントID
      userPoolClientId: String("cdo6q8s427opcjpbrcgell3t0"),
      loginWith: {
        oauth: {
          // Cognitoドメイン(XXXX => 作成したドメイン名を挿入)
          domain: "testuserpool4.auth.ap-northeast-1.amazoncognito.com",
          scopes: ["openid", "email", "profile"],
          //ログイン後、リダイレクトするurl
          redirectSignIn: ["http://localhost:5173/login/home"],
          //ログアウト後、リダイレクトするurl
          redirectSignOut: ["http://localhost:5173/login"],
          responseType: "code",
          // providers: ["Google", { custom: "Line" }], //後述(ソーシャルログイン)
        }
      }
    }
  }
};