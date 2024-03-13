import {useContext, useEffect, useRef, useState} from "react";

import {File} from "@/src/model";
import FileLogo from "@/src/assets/FileLogo";
import FileContext from "@/src/context/FileContext";
import LanguageLogo from "@/src/assets/languages/LanguageLogo";

interface Props {
  file: File,
  onClose: () => void
}

const NavbarFile = ({file, onClose}: Props) => {
  const { renameCurrentFile } = useContext(FileContext);
  const [ renamingFile, setRenamingFile ] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renamingFile) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [renamingFile]);

  const onDoubleClick = () => {
    setRenamingFile(true);
  };

  const endRenaming = () => {
    const newFileName = (inputRef.current?.value || "").trim();
    if (newFileName.length !== 0) {
      renameCurrentFile(newFileName);
    }
    setRenamingFile(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      endRenaming();
    }
  };

  return <>
      <div
        className="d-flex flex-row gap-1"
        onDoubleClick={onDoubleClick}
      >
        <div>
          <LanguageLogo
            language={file.osmiaLanguage}
          />
        </div>
        {!renamingFile &&
          <span>{file.name}</span> ||
          <input
            ref={inputRef}
            type="text"
            className="form-control p-0 ps-1 pe-1 ms-2 me-2 border-0"
            defaultValue={file.name}
            onBlur={endRenaming}
            onKeyDown={onKeyDown}
          />
        }
      </div>
      <span className="close-tab ps-1" onClick={onClose}>
        &times;
      </span>
  </>
};

export default NavbarFile;
