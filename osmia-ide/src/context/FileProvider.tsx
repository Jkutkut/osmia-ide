import {FileHandlerObject} from "@/src/model";
import FileContext from "./FileContext";

interface Props {
  data: FileHandlerObject;
  children: React.ReactNode;
};

const FileProvider = ({data, children}: Props) => {
  return (
    <FileContext.Provider value={data}>
      {children}
    </FileContext.Provider>
  );
};

export default FileProvider;
