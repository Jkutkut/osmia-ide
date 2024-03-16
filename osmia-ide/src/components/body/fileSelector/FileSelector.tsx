import {useContext, useRef, useState} from "react";
import {useTranslation} from "react-i18next";

import FileContext from "@/src/context/FileContext";
import FileSelectorItem from "./FileSelectorItem";
import AddFileLogo from "@/src/assets/AddFileLogo";
import ImportLogo from "@/src/assets/ImportLogo";
import {importFileFromJson} from "@/src/tools/osmiaFileUtils";

const FileSelector = () => {
  const { t } = useTranslation();
  const { files, addFile, importFile, editFile, removeFile } = useContext(FileContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ toast, setToast ] = useState<any | null>(null);

  const addToast = (newToast: any) => {
    setToast(newToast);
    if (newToast.timeout) {
      setTimeout(() => {
        setToast(null);
      }, newToast.timeout);
    }
  };

  const onImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file)
      return;
    const { name, type } = file;
    const errorToast = {
      msg: t('body.fileSelector.toast.invalidFile', {name}),
      type: 'error',
      // timeout: 3000
    };
    if (type !== "application/json") {
      addToast(errorToast);
      return;
    }
    console.log(file);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      if (!reader.result) {
        addToast(errorToast);
        return;
      }
      if (typeof reader.result !== "string") {
        addToast(errorToast);
        return;
      }
      const fileData: string = reader.result as string;
      let fileJson: any;
      try {
        fileJson = JSON.parse(fileData);
      }
      catch (e) {
        addToast(errorToast);
        return;
      }
      const file = importFileFromJson(fileJson);
      if (!file) {
        addToast(errorToast);
        return;
      }
      importFile(file);
    }
 }

  return (
    <div className="w-100 overflow-x-auto">
      {files.length > 0 && <>
        {toast &&
          <div
            className="alert alert-danger m-3"
            role="alert"
          >
            <div className="d-flex align-items-center justify-content-between">
              {toast.msg}
              <button
                type="button"
                className="btn-close"
                onClick={() => setToast(null)}
              >
              </button>
            </div>
          </div>
        }
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
                  <span className="desktop-only">
                    {t('body.fileSelector.button.newFile')}
                  </span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="d-none"
                  onChange={handleFileImport}
                />
                <button
                  className="btn d-flex justify-content-center flex-row gap-2"
                  onClick={onImport}
                >
                  <div className="text-primary">
                    <ImportLogo />
                  </div>
                  <span className="desktop-only">
                    {t('body.fileSelector.button.import')}
                  </span>
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
      </>}
      {files.length === 0 && (
        <div className="d-flex justify-content-center pt-2">
          <button
            className="btn d-flex justify-content-center flex-row gap-2"
            onClick={addFile}
          >
            <div className="text-primary">
              <AddFileLogo />
            </div>
            {t('body.fileSelector.button.newFile')}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileSelector;
