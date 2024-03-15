import {File} from "@/src/model";
import {version} from "@/package.json";
import { compressOsmiaFile, decompressOsmiaFile} from "./utils";

const exportFile: (file: File) => void = (file: File) => {
  const osmiaData = compressOsmiaFile(file);
  const data: Record<string, string> = {
    version,
    data: osmiaData
  };
  console.log(file);
  console.log(data);
  const blobFile = new Blob(
    [JSON.stringify(data)],
    {type: 'application/json'}
  );
  const url = window.URL.createObjectURL(blobFile);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name;
  link.click();
  window.URL.revokeObjectURL(url);
};

const importFileFromJson: (fileJson: any) => File | null = (fileJson: any) => {
  const {version, data} = fileJson;
  if (!version || !data)
    return null;
  // TODO handle version
  const file = decompressOsmiaFile('', data);
  return file;
}

export {compressOsmiaFile, decompressOsmiaFile};
export {exportFile, importFileFromJson};
