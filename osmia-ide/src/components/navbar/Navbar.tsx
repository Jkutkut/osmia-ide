import {useContext, useEffect, useLayoutEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';

import FolderLogo from "@/src/assets/FolderLogo";
import NavbarFile from "./NavbarFile";
import NavbarItem from "./NavbarItem";
import NavbarProjectInfo from './NavbarProjectInfo';
import './Navbar.scss';
import FileContext from '@/src/context/FileContext';

interface Props {
  closeFile: (fileId: string) => void,
  focusTab: (tab: number) => void,
};

const Navbar = ({focusTab, closeFile}: Props) => {
  const MAIN_TAB = -1;
  const { t } = useTranslation();
  const { tabIndex, openFiles } = useContext(FileContext);
  const [ scrollIsOn, setScrollIsOn ] = useState(false);

  const updateScrollIsOn = () => {
    const fileList = document.getElementById('file-list');
    if (!fileList) return;
    const scrollIsOn = fileList.scrollWidth > fileList.clientWidth;
    setScrollIsOn(scrollIsOn);
  };

  useEffect(updateScrollIsOn, [openFiles]);

  useLayoutEffect(() => {
    window.addEventListener('resize', updateScrollIsOn);
    return () => window.removeEventListener('resize', updateScrollIsOn);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-0">
      <div className="container-fluid flex-nowrap gap-3">
        <div className="flex-grow-0 flex-shrink-0 flex-basis-auto align-items-end">
          <NavbarItem
            active={tabIndex === MAIN_TAB}
            isScrollBarOn={false}
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
        <div id="file-list" className="w-100 gap-2 d-flex flex-grow-1 overflow-x-auto flex-row">
          {openFiles.map((file, idx) => (
            <NavbarItem
              key={idx}
              isScrollBarOn={scrollIsOn}
              active={tabIndex === idx}
              onClick={() => focusTab(idx)}
              onMiddleClick={() => closeFile(file.id)}
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
