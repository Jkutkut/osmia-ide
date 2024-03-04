import './i18n/i18n.ts'
import {useState} from 'react';
import { useTranslation } from 'react-i18next';

import NavbarProjectInfo from './components/navbar/NavbarProjectInfo'
import NavbarFile from './components/navbar/NavbarFile.tsx';
import NavbarItem from './components/navbar/NavbarItem.tsx';
import FolderLogo from './assets/FolderLogo.tsx';

function App() {
  const { t } = useTranslation();
  const [ openFiles, setOpenFiles ] = useState([
    {
      id: 'file-1',
      name: 'File01'
    },
    {
      id: 'file-2',
      name: 'File02'
    },
    {
      id: 'file-3',
      name: 'File03'
    }
  ]);
  const [activeTab, setActiveTab] = useState(-1);

  const MAIN_TAB = -1;
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-0">
        <div className="container-fluid flex-nowrap">
          <div className='d-flex gap-3'>
            <NavbarItem
              active={activeTab === MAIN_TAB}
              onClick={() => setActiveTab(MAIN_TAB)}
            >
              <div>
                <FolderLogo />
              </div>
              <span>
                {t('navbar.mainTab')}
              </span>
            </NavbarItem>
            <div className="d-flex gap-1 flex-nowrap">
              {openFiles.map((file, idx) => (
                <NavbarItem
                  active={activeTab === idx}
                  onClick={() => setActiveTab(idx)}
                  key={file.id}
                >
                  <NavbarFile file={file}/>
                </NavbarItem>
              ))}
            </div>
          </div>
          <NavbarProjectInfo />
        </div>
      </nav>
    </>
  )
}

export default App
