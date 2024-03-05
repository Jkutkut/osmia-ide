import {useContext} from "react";
import FileContext from "../../../context/FileContext";
import PencilLogo from "../../../assets/PencilLogo";
import TrashLogo from "../../../assets/TrashLogo";

interface Props {

};

const FileSelector = ({}: Props) => {
  const { files, addFile, editFile, removeFile } = useContext(FileContext);
  return (
    <table className="table align-middle">
      <thead>
        <tr>
          <th scope="col">
            Name
            {/* TODO i18n */}
          </th>
          <th scope="col">
            Last update
            {/* TODO i18n */}
          </th>
          <th scope="col">
            {/*Actions*/}
            {/* TODO i18n */}
            <button
              className="btn btn-primary"
              onClick={addFile}
            >
              New file
            </button>
          </th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {files.map((file, idx) => (
          <tr key={idx}>
            <td>{file.name}</td>
            <td>{file.last_udate_str}</td>
            <td>
              <button
                className="btn"
                onClick={() => editFile(file.id)}
              >
                <PencilLogo />
              </button>
              <button
                className="btn"
                onClick={() => removeFile(file.id)}
              >
                <TrashLogo classes="text-danger" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileSelector;
