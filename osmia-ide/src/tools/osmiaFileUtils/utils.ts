import {File} from "@/src/model";
import {base64ToNbr, nbrToBase64} from "@/src/tools/base64";
import {lzw_decode, lzw_encode} from "@/src/tools/lzw";

const compressOsmiaFile: (file: File) => string = (file: File) => {
  const fields = [
    file.name,
    file.osmiaLanguage,
    nbrToBase64(file.lastUpdate.getTime()),
    ...file.osmia
  ];
  return lzw_encode(fields.join('\0'));
};

const decompressOsmiaFile: (id: string, data: string) => File = (id: string, data: string) => {
  const fields = lzw_decode(data).split('\0');
  const [
    name,
    language,
    lastUpdate,
    ...osmia
  ] = fields;
  return {
    id,
    name,
    lastUpdate: new Date(base64ToNbr(lastUpdate)),
    osmiaLanguage: language,
    osmia
  } as File;
};

export {compressOsmiaFile, decompressOsmiaFile};
