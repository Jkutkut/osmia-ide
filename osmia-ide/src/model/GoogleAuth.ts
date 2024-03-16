import {TokenResponse} from "@react-oauth/google";

interface GoogleAuth {
  isLoading: boolean;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  user: TokenResponse | null;
};

export default GoogleAuth;
