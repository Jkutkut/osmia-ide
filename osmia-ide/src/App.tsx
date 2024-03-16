import {Navigate, Route, Routes, useSearchParams} from "react-router-dom";
import Editor from "./pages/Editor";
import useGoogleAuth from "./hooks/useGoogleAuth";
import Loading from "./pages/Loading";
import GoogleAuthProvider from "./context/GoogleAuthProvider";
import SaveUrlRedirect from "./components/router/SaveUrlRedirect";
import {useTranslation} from "react-i18next";
import Login from "./pages/Login";

const App = () => {
  const gAuth = useGoogleAuth();
  const {isLoading, isLoggedIn, login} = gAuth;
  const [searchParams] = useSearchParams();
  const {t} = useTranslation();

  if (isLoading) {
    return <Loading/>;
  }
  if (!isLoggedIn) {
    return <>
      <Routes>
        <Route path="/login" element={<Login onLogin={login}/>}/>
        <Route path="/*" element={<SaveUrlRedirect
          to="/login"
          fieldName={t("url.redirect.label")}
        />} />
      </Routes>
    </>;
  }
  if (searchParams.has(t("url.redirect.label"))) {
    const url = searchParams.get(t("url.redirect.label")) || "/";
    return <Navigate to={url} replace={true} />;
  }

  return <>
    <GoogleAuthProvider gAuth={gAuth}>
      <Routes>
        <Route path="/" element={<Editor/>}/>
        <Route path="/*" element={<Navigate to="/"/>}/>
      </Routes>
    </GoogleAuthProvider>
  </>;
}

export default App;
