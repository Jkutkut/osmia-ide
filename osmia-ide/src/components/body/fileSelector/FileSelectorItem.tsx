import ExportLogo from "@/src/assets/ExportLogo";
import PencilLogo from "@/src/assets/PencilLogo";
import TrashLogo from "@/src/assets/TrashLogo";
import {File} from "@/src/model";

interface Props {
  file: File;
  onEdit: () => void;
  onRemove: () => void;
}

const FileSelectorItem = ({file, onEdit, onRemove}: Props) => {
  const {
    name: filename,
    lastUpdate: d
  } = file;
  const dateTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  const date = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  return (
    <tr>
      <td className="table-file-name overflow-x-auto">
          {filename}
      </td>
      <td className="table-last-update text-center overflow-x-auto">
        <span className="desktop-only">
          {dateTime}
        </span>
        &nbsp;
        <span>
          {date}
        </span>
      </td>
      <td className="table-actions text-center">
        <button
          className="btn"
          onClick={onEdit}
        >
          <PencilLogo />
        </button>
        <button className="btn text-primary">
          <ExportLogo />
        </button>
        <button
          className="btn"
          onClick={onRemove}
        >
          <TrashLogo classes="text-danger" />
        </button>
      </td>
    </tr>
  );
};

export default FileSelectorItem;
