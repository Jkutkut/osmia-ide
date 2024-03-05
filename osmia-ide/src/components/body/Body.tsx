import {useContext} from "react";
import FileContext from "../../context/FileContext";
import FileSelector from "./fileSelector/FileSelector";

interface Props {
};

const Body = ({}: Props) => {
  const FILE_SELECTOR = -1;
  const { tabIndex, openFiles } = useContext(FileContext);
  return <>
    {tabIndex === FILE_SELECTOR &&
      <FileSelector /> ||
      <></>
    }
    {tabIndex !== -1 &&
      <div>
        {openFiles[tabIndex].name}
      </div>
    }
  </>;
};

export default Body;
