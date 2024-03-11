import {File} from ".";

interface FileHandlerObject {
  tabIndex: number;
  focusTab: (tab: number) => void;
  openFiles: File[];
  files: File[];
  addFile: () => void;
  editFile: (fileId: string) => void;
  closeFile: (fileId: string) => void;
  removeFile: (fileId: string) => void;
};

export default FileHandlerObject;