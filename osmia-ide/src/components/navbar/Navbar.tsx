import {useContext} from 'react';
import { useTranslation } from 'react-i18next';

import FolderLogo from "../../assets/FolderLogo";
import NavbarFile from "./NavbarFile";
import NavbarItem from "./NavbarItem";
import NavbarProjectInfo from './NavbarProjectInfo';
import './Navbar.scss';
import FileContext from '../../context/FileContext';

interface Props {
  closeFile: (fileId: string) => void,
  focusTab: (tab: number) => void,
};

const Navbar = ({focusTab, closeFile}: Props) => {
  const MAIN_TAB = -1;
  const { t } = useTranslation();
  const { tabIndex, openFiles } = useContext(FileContext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-0">
      <div className="container-fluid flex-nowrap gap-3">
        <div className="flex-grow-0 flex-shrink-0 flex-basis-auto align-items-end">
          <NavbarItem
            active={tabIndex === MAIN_TAB}
            onClick={() => focusTab(MAIN_TAB)}
          >
            <div>
              <FolderLogo />
            </div>
            <span className="desktop-only">
              {t('navbar.mainTab')}
            </span>
          </NavbarItem>
        </div>
        <div className="w-100 gap-2 d-flex flex-grow-1 overflow-x-auto flex-row">
          {openFiles.map((file, idx) => (
            <NavbarItem
              key={idx}
              active={tabIndex === idx}
              onClick={() => focusTab(idx)}
            >
              <NavbarFile
                file={file}
                onClose={() => closeFile(file.id)}
              />
            </NavbarItem>
          ))}
        </div>
        <NavbarProjectInfo />
      </div>
    </nav>
  );
};

export default Navbar;
