import {useEffect, useState} from "react";
import { version } from "@/package.json";
import { FileHandlerObject, File } from "@/src/model";
import fileFromJSON from "@/src/tools/fileFromJSON";

function createFile(n: number) {
  const text_with_n_chars = Array.from({ length: n }, (_, index) => index + 1).join('');
  const d = new Date();
  const filename = `File ${n} - ${text_with_n_chars}`;
  return {
    id: `_f${n}`,
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

const store = (key: string, value: string) => {
  const value64 = btoa(value);
  localStorage.setItem(key, value64);
};

const remove = (key: string) => {
  localStorage.removeItem(key);
};

const load = (key: string) => {
  const value64 = localStorage.getItem(key);
  if (!value64) {
    return '';
  }
  return atob(value64);
};

const useFileHandler = () => {
  const [ tabIndex, setTabIndex ] = useState(-1);
  const [ files, setFiles ] = useState<File[]>([]);
  const [ openFiles, setOpenFiles ] = useState<File[]>([]);

  useEffect(() => {
    const indexes = JSON.parse(load('indexes') || '[]') as string[];
    const newFiles = indexes.map(id => fileFromJSON(JSON.parse(load(id))));
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

    // Store // TODO refactor
    remove(fileId);
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

  const addFile = () => { // TODO
    const newFile = createFile(files.length + 1);
    const newFiles = [...files, newFile];
    setFiles(newFiles);
    setTabIndex(openFiles.length);
    setOpenFiles([...openFiles, newFile]);

    // Store // TODO refactor
    store(newFile.id, JSON.stringify(newFile));
    store('indexes', JSON.stringify(newFiles.map(file => file.id)));
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
