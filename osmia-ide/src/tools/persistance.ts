import {File} from "@/src/model";
import {compressOsmiaFile, decompressOsmiaFile} from "./osmiaFileUtils";

const store = (key: string, value: string) => {
  const value64 = btoa(value);
  localStorage.setItem(key, value64);
};

const load = (key: string) => {
  const value64 = localStorage.getItem(key);
  if (!value64) {
    return '';
  }
  return atob(value64);
};

const storeFile = (file: File) => {
  localStorage.setItem(file.id, compressOsmiaFile(file));
};

const loadFile: (key: string) => File = (key: string) => {
  const data = localStorage.getItem(key) || '';
  return decompressOsmiaFile(key, data);
};

export {store, load, storeFile, loadFile};
