import {useTranslation} from "react-i18next";

interface Props {
  onLogin: () => void;
}

const Login = ({onLogin}: Props) => {
  const {t} = useTranslation();
  return <>
    <button
      className="btn btn-outline-primary"
      onClick={onLogin}
    >
      {t("body.login.btn.login.label")}
    </button>
  </>;
};

export default Login;
