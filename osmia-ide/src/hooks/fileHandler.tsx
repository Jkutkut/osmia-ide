import {useState} from "react";
import File from "../model/File";

function createFile(n: number) {
  const text_with_n_chars = Array.from({ length: n }, (_, index) => index + 1).join('');
  const d = new Date();
  const date = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  return {
    id: `file-${n}`,
    name: `File ${n} - ${text_with_n_chars}`,
    last_update: d,
    last_udate_str: date
  } as File;
}

function fileGenerator(nbr: number) {
  return Array.from({ length: nbr }, (_, index) => index + 1).map(createFile);
}

const fileHandler = () => {
  const [ tabIndex, setTabIndex ] = useState(-1);
  // const [ files, setFiles ] = useState<File[]>([]);
  const [ files, setFiles ] = useState<File[]>(fileGenerator(5)); // TODO
  const [ openFiles, setOpenFiles ] = useState<File[]>([]);

  const focusTab = (tab: number) => {
    if (tab < -1 || tab >= openFiles.length) {
      return;
    }
    setTabIndex(tab);
  };

  // TODO refactor

  const closeFile = (fileId: string) => {
    const newOpenFiles = openFiles.filter(file => file.id !== fileId);
    const openFileIdx = newOpenFiles.findIndex(file => file.id === fileId);
    const newIdx = (openFileIdx <= tabIndex) ? Math.max(-1, tabIndex - 1) : tabIndex;
    setTabIndex(newIdx);
    setOpenFiles(newOpenFiles);
  };

  const removeFile = (fileId: string) => {
    closeFile(fileId);
    const newFiles = files.filter(file => file.id !== fileId);
    setFiles(newFiles);
  };

  const editFile = (fileId: string) => {
    let wantedFile = files.find(file => file.id === fileId);
    if (!wantedFile) {
      return;
    }
    let fileIdx = openFiles.findIndex(file => file.id === fileId);
    if (fileIdx === -1) {
      setTabIndex(openFiles.length);
      setOpenFiles([...openFiles, wantedFile]);
    }
    else {
      setTabIndex(fileIdx);
    }
  };

  const addFile = () => { // TODO
    const newFile = createFile(files.length + 1);
    setFiles([...files, newFile]);
    setTabIndex(openFiles.length);
    setOpenFiles([...openFiles, newFile])
  };

  return {
    tabIndex,
    focusTab,
    openFiles,
    files,
    addFile,
    editFile,
    closeFile,
    removeFile
  } as FileHandlerObject;
};

interface FileHandlerObject {
  tabIndex: number;
  focusTab: (tab: number) => void;
  openFiles: File[];
  files: File[];
  addFile: () => void;
  editFile: (fileId: string) => void;
  closeFile: (fileId: string) => void;
  removeFile: (fileId: string) => void;
}

export default fileHandler;
export type { FileHandlerObject };
