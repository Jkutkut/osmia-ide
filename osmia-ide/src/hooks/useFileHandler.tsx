import {useEffect, useState} from "react";
import { version } from "@/package.json";
import { FileHandlerObject, File } from "@/src/model";
import fileFromJSON from "@/src/tools/fileFromJSON";
import {load, loadFile, store, storeFile} from "../tools/persistance";

function createFile(n: number) {
  let fileId;
  while (true) {
    fileId = `_f${n}`;
    if (!localStorage.getItem(fileId)) {
      break;
    }
    n++;
  }
  const filename = `new-osmia-file-${n}`;
  const d = new Date();
  return {
    id: fileId,
    name: filename,
    lastUpdate: d,
    osmia: [
      "<h1>Hello, world!</h1>\n<p>This is the osmia code editor.</p>",
      `{\n\t\"program\": \"${filename}\",\n\t\"version\": \"${version}\"\n}`,
      "<!-- The result will be here -->"
    ],
    osmiaLanguage: 'html'
  } as File;
}

const useFileHandler = () => {
  const [ tabIndex, setTabIndex ] = useState(-1);
  const [ files, setFiles ] = useState<File[]>([]);
  const [ openFiles, setOpenFiles ] = useState<File[]>([]);

  useEffect(() => {
    const indexes = JSON.parse(load('indexes') || '[]') as string[];
    const newFiles = indexes.map(id => fileFromJSON(loadFile(id)));
    setFiles(newFiles);
  }, []);

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

    localStorage.removeItem(fileId);
    store('indexes', JSON.stringify(newFiles.map(file => file.id)));
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

  const addFile = () => {
    const newFile = createFile(files.length + 1);
    const newFiles = [...files, newFile];
    setFiles(newFiles);
    setTabIndex(openFiles.length);
    setOpenFiles([...openFiles, newFile]);

    storeFile(newFile);
    store('indexes', JSON.stringify(newFiles.map(file => file.id)));
  };

  // Edition
  const renameCurrentFile = (name: string) => {
    if (tabIndex === -1)
      return;
    const newFile = {
      ...openFiles[tabIndex],
      name,
      lastUpdate: new Date()
    } as File;
    const { id } = newFile;
    setFiles(files.map(file => file.id === id ? newFile : file));
    setOpenFiles(openFiles.map(file => file.id === id ? newFile : file));

    storeFile(newFile);
  }
  const changeCurrentFileLanguage = (language: string) => {
    if (tabIndex === -1)
      return;
    const newFile = {
      ...openFiles[tabIndex],
      osmiaLanguage: language,
      lastUpdate: new Date()
    } as File;
    const { id } = newFile;
    setFiles(files.map(file => file.id === id ? newFile : file));
    setOpenFiles(openFiles.map(file => file.id === id ? newFile : file));

    storeFile(newFile);
  };
  const saveCurrentFileContent = (contentType: number, content: string) => {
    if (tabIndex === -1)
      return;
    console.debug("Saving content", { contentType, content });
    const newOsmia = [...openFiles[tabIndex].osmia];
    newOsmia[contentType] = content;
    const newFile = {
      ...openFiles[tabIndex],
      osmia: newOsmia,
      lastUpdate: new Date()
    } as File;
    const { id } = newFile;
    setFiles(files.map(file => file.id === id ? newFile : file));
    setOpenFiles(openFiles.map(file => file.id === id ? newFile : file));

    storeFile(newFile);
  };

  return {
    tabIndex,
    focusTab,
    openFiles,
    files,
    addFile,
    editFile,
    closeFile,
    removeFile,

    // Edition
    renameCurrentFile,
    changeCurrentFileLanguage,
    saveCurrentFileContent
  } as FileHandlerObject;
};

export default useFileHandler;
