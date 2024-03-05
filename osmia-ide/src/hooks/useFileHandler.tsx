import {useState} from "react";
import { FileHandlerObject, File } from "../model";

function createFile(n: number) {
  const text_with_n_chars = Array.from({ length: n }, (_, index) => index + 1).join('');
  const d = new Date();
  return {
    id: `file-${n}`,
    name: `File ${n} - ${text_with_n_chars}`,
    lastUpdate: d
  } as File;
}

function fileGenerator(nbr: number) {
  return Array.from({ length: nbr }, (_, index) => index + 1).map(createFile);
}

const useFileHandler = () => {
  const [ tabIndex, setTabIndex ] = useState(-1);
  // const [ files, setFiles ] = useState<File[]>([]);
  const [ files, setFiles ] = useState<File[]>(fileGenerator(10)); // TODO
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
    const wantedFile = files.find(file => file.id === fileId);
    if (!wantedFile) {
      return;
    }
    const fileIdx = openFiles.findIndex(file => file.id === fileId);
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

export default useFileHandler;
