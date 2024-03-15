import {File} from "@/src/model";
import {lzw_decode, lzw_encode} from "@/src/tools/lzw";
import {base64ToNbr, nbrToBase64} from "@/src/tools/base64";

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
  const fields = [
    file.name,
    file.osmiaLanguage,
    nbrToBase64(file.lastUpdate.getTime()),
    ...file.osmia
  ];
  const data = fields.join('\0');
  localStorage.setItem(file.id, lzw_encode(data));
};

const loadFile = (key: string) => {
  const data = localStorage.getItem(key) || '';
  const fields = lzw_decode(data).split('\0');
  const [
    name,
    language,
    lastUpdate,
    ...osmia
  ] = fields;
  return {
    id: key,
    name,
    lastUpdate: new Date(base64ToNbr(lastUpdate)),
    osmiaLanguage: language,
    osmia
  } as File;
};

export {store, load, storeFile, loadFile};
