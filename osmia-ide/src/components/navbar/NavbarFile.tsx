import {File} from "@/src/model";
import FileLogo from "@/src/assets/FileLogo";

interface Props {
  file: File,
  onClose: () => void
}

const NavbarFile = ({file, onClose}: Props) => {
  return <>
      <div>
        <FileLogo />
      </div>
      <span>{file.name}</span>
      <span className="close-tab ps-1" onClick={onClose}>
        &times;
      </span>
  </>
};

export default NavbarFile;
