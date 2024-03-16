import {Navigate, Route, Routes, useSearchParams} from "react-router-dom";
import Editor from "./pages/Editor";
import useGoogleAuth from "./hooks/useGoogleAuth";
import Loading from "./pages/Loading";
import GoogleAuthProvider from "./context/GoogleAuthProvider";

const App = () => {
  const gAuth = useGoogleAuth();
  const {isLoading, isLoggedIn, login} = gAuth;

  if (isLoading) {
    return <Loading/>;
  }
  if (!isLoggedIn) {
    return <>
      <button onClick={login}>Login</button>
    </>;
  }

  console.log(gAuth);
  console.log(gAuth.logout);

  return <>
    <GoogleAuthProvider gAuth={gAuth}>
      <Routes>
        <Route path="/" element={<Navigate to="/editor"/>}/>
        <Route path="/editor" element={<Editor/>}/>

        <Route path="/*" element={<Navigate to="/"/>}/>
      </Routes>
    </GoogleAuthProvider>
  </>;
}

export default App;
