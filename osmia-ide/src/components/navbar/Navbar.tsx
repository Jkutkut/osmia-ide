import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import FolderLogo from "../../assets/FolderLogo";
import NavbarFile from "./NavbarFile";
import NavbarItem from "./NavbarItem";
import NavbarProjectInfo from './NavbarProjectInfo';

interface Props {
  activeTab: number,
  setActiveTab: (tab: number) => void,
  files: {
    id: string,
    name: string
  }[]
};

const Navbar = ({activeTab, setActiveTab, files}: Props) => {
  const MAIN_TAB = -1;
  const { t } = useTranslation();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-0">
      <div className="container-fluid flex-nowrap gap-3">
        <div className="flex-grow-0 flex-shrink-0 flex-basis-auto">
          <NavbarItem
            active={activeTab === MAIN_TAB}
            onClick={() => setActiveTab(MAIN_TAB)}
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
          {files.map((file, idx) => (
            <div
              key={file.id}
            >
              <NavbarItem
                active={activeTab === idx}
                onClick={() => setActiveTab(idx)}
              >
                <NavbarFile file={file}/>
              </NavbarItem>
            </div>
          ))}
        </div>
        <NavbarProjectInfo />
      </div>
    </nav>
  );
};

export default Navbar;
