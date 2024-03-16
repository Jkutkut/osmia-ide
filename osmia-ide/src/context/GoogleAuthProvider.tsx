import GoogleAuth from "@/src/model/GoogleAuth";
import GoogleAuthContext from "./GoogleAuthContext";

interface Props {
  gAuth: GoogleAuth;
  children: React.ReactNode;
};

const GoogleAuthProvider = ({gAuth, children}: Props) => {
  return (
    <GoogleAuthContext.Provider value={gAuth}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export default GoogleAuthProvider;
