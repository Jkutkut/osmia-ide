import {File} from ".";

interface FileHandlerObject {
  tabIndex: number;
  focusTab: (tab: number) => void;
  openFiles: File[];
  files: File[];
  addFile: () => void;
  importFile: (file: File) => void;
  editFile: (fileId: string) => void;
  closeFile: (fileId: string) => void;
  removeFile: (fileId: string) => void;

  // Edition
  renameCurrentFile: (name: string) => void;
  changeCurrentFileLanguage: (language: string) => void;
  saveCurrentFileContent: (contentType: number, content: string) => void;
};

export default FileHandlerObject;
