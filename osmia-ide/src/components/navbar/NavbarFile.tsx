import {useContext, useState} from "react";

import {File} from "@/src/model";
import FileLogo from "@/src/assets/FileLogo";
import FileContext from "@/src/context/FileContext";

interface Props {
  file: File,
  onClose: () => void
}

const NavbarFile = ({file, onClose}: Props) => {
  const { renameCurrentFile } = useContext(FileContext);
  const [ renamingFile, setRenamingFile ] = useState(false);
  const inputId = `changeName-${file.id}`;

  const onDoubleClick = () => {
    setRenamingFile(true);
  };

  const endRenaming = () => {
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (!input) return;
    const newFileName = input.value;
    renameCurrentFile(newFileName);
    setRenamingFile(false);
  };

  // TODO fix styles
  // TODO select all name on double click

  return <>
      <div
        className="d-flex flex-row gap-1"
        onDoubleClick={onDoubleClick}
      >
        <div>
          <FileLogo />
        </div>
        {!renamingFile &&
          <span>{file.name}</span> ||
          <input
            id={inputId}
            type="text"
            className="form-control"
            defaultValue={file.name}
            onBlur={endRenaming}
          />
        }
      </div>
      <span className="close-tab ps-1" onClick={onClose}>
        &times;
      </span>
  </>
};

export default NavbarFile;
