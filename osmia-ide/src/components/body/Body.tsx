import {useContext} from "react";

import FileContext from "@/src/context/FileContext";
import FileSelector from "./fileSelector/FileSelector";
import FileEditor from "./fileEditor/FileEditor";

const Body = () => {
  const FILE_SELECTOR = -1;
  const { tabIndex } = useContext(FileContext);
  return <>
    {tabIndex === FILE_SELECTOR &&
      <FileSelector /> ||
      <FileEditor key={tabIndex} />
    }
  </>;
};

export default Body;
