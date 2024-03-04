import FileLogo from "../../assets/FileLogo";

interface Props {
  file: {
    id: string
    name: string
  }
}

const NavbarFile = ({file}: Props) => {
  const closeTab = () => {
    alert('close tab'); // TODO handle
  };
  return <>
      <div>
        <FileLogo />
      </div>
      <span>{file.name}</span>
      <span className="close-tab ps-1" onClick={closeTab}>
        &times;
      </span>
  </>
};

export default NavbarFile;
