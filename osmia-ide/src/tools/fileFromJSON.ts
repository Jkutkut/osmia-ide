import { File } from "@/src/model";

const fileFromJSON = (json: any): File => {
  return {
    id: json.id,
    name: json.name,
    lastUpdate: new Date(json.lastUpdate),
    osmia: json.osmia,
    osmiaLanguage: json.osmiaLanguage
  };
};

export default fileFromJSON;
