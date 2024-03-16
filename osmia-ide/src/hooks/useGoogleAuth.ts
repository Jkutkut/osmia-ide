import {TokenResponse, googleLogout, useGoogleLogin} from "@react-oauth/google";
import {useState} from "react"
import GoogleAuth from "../model/GoogleAuth";

const loadUser = (): TokenResponse | null => {
  const user = sessionStorage.getItem('user');
  if (!user) {
    return null;
  }
  return JSON.parse(user) as TokenResponse;
};


const useGoogleAuth = () => {
  // TODO check old tokens with server
  const [user, setUser] = useState<TokenResponse | null>(loadUser());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const saveCredentials = (user: any) => {
    setUser(user);
    sessionStorage.setItem('user', JSON.stringify(user));
  };

  const gLogin = useGoogleLogin({
    onSuccess: (user) => {
      saveCredentials(user);
      setIsLoading(false);
    },
    onError: (error) => {
      console.warn('Login Failed:', error);
      setIsLoading(false);
    },
    onNonOAuthError: (error) => {
      console.warn('Login Failed:', error);
      setIsLoading(false);
    }
  });

  const login = () => {
    setIsLoading(true);
    gLogin();
  };

  const logout = () => {
    googleLogout();
    setUser(null);
    sessionStorage.removeItem('user');
  };

  return {
    isLoading,
    isLoggedIn: !!user, // TODO check backend
    login,
    logout,
    user
  } as GoogleAuth;
}

export default useGoogleAuth;
export type {GoogleAuth};
