import {useContext} from "react";
import {useTranslation} from "react-i18next";

import FileContext from "@/src/context/FileContext";
import FileSelectorItem from "./FileSelectorItem";
import AddFileLogo from "@/src/assets/AddFileLogo";

const FileSelector = () => {
  const { t } = useTranslation();
  const { files, addFile, editFile, removeFile } = useContext(FileContext);
  return (
    <div className="w-100 overflow-x-auto">
      <table className="table align-middle text-nowrap">
        <thead>
          <tr className="align-middle">
            <th scope="col">
              {t('body.fileSelector.table.name')}
            </th>
            <th scope="col" className="text-center">
              {t('body.fileSelector.table.lastUpdate')}
            </th>
            <th scope="col" className="d-flex justify-content-center flex-row gap-2">
              <button
                className="btn d-flex justify-content-center flex-row gap-2"
                onClick={addFile}
              >
                <div className="text-primary">
                  <AddFileLogo />
                </div>
                {t('body.fileSelector.button.newFile')}
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {files.map((file, idx) => (
            <FileSelectorItem
              key={idx}
              file={file}
              onEdit={() => editFile(file.id)}
              onRemove={() => removeFile(file.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileSelector;
