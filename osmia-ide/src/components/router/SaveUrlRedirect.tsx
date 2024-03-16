import {Navigate, useLocation} from "react-router-dom";

interface Props {
  to: string;
  fieldName?: string;
};

const SaveUrlRedirect = ({to, fieldName}: Props) => {
  if (!fieldName) {
    fieldName = "then";
  }
  const {pathname} = useLocation();
  return <Navigate to={`${to}?${fieldName}=${pathname}`} />;
};

export default SaveUrlRedirect;
