import React, { useContext, createContext } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";

const AuthContext = createContext({});
//android 411150837949-4bue94136qsleee16osi9l4e07hnjdf8.apps.googleusercontent.com
//web 737803248370-t07e3sbjut05jdubrf22umdue3soj2io.apps.googleusercontent.com
// const config = {
//   androidClientId:
//     "411150837949-4bue94136qsleee16osi9l4e07hnjdf8.apps.googleusercontent.com",
//   scopes: ["profile", "email"],
//   permissions: ["public_profile", "email", "gender", "location"],
// };

export const AuthProvider = ({ children }) => {
  const signInWithGoogle = async () => {
    Google.logInAsync(config).then(async (logInResult) => {
      if (logInResult.type === "success") {
        //logIn
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
