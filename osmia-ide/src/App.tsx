import './i18n/i18n.ts'
import {useState} from 'react';

import Navbar from './components/navbar/Navbar.tsx';
import PencilLogo from './assets/PencilLogo.tsx';
import TrashLogo from './assets/TrashLogo.tsx';

function createFile(n: number) {
  const text_with_n_chars = Array.from({ length: n }, (_, index) => index + 1).join('');
  const d = new Date();
  const date = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  return {
    id: `file-${n}`,
    name: `File ${n} - ${text_with_n_chars}`,
    last_update: d,
    last_udate_str: date
  } as File;
}

function fileGenerator(nbr: number) {
  return Array.from({ length: nbr }, (_, index) => index + 1).map(createFile);
}

type File = {
  id: string
  name: string
  last_update: Date
  last_udate_str: string
}

function App() {
  const [ files, setFiles ] = useState<File[]>(fileGenerator(4));
  const [ tabIndex, setTabIndex ] = useState(-1);
  const [ editorFiles, setEditorFiles ] = useState<File[]>([]);

  const closeFile = (fileId: string) => {
    const openFiles = editorFiles.filter(file => file.id !== fileId);
    const openFileIdx = editorFiles.findIndex(file => file.id === fileId);
    const newIdx = (openFileIdx <= tabIndex) ? Math.max(-1, tabIndex - 1) : tabIndex;
    setTabIndex(newIdx);
    setEditorFiles(openFiles);
  };

  const removeFile = (fileId: string) => {
    closeFile(fileId);
    const newFiles = files.filter(file => file.id !== fileId);
    setFiles(newFiles);
  };

  const editFile = (fileId: string) => {
    let wantedFile = files.find(file => file.id === fileId);
    if (!wantedFile) {
      return;
    }
    let fileIdx = editorFiles.findIndex(file => file.id === fileId);
    if (fileIdx === -1) {
      setTabIndex(editorFiles.length);
      setEditorFiles([...editorFiles, wantedFile]);
    }
    else {
      setTabIndex(fileIdx);
    }
  };

  const addFile = () => {
    const newFile = createFile(files.length + 1);
    setFiles([...files, newFile]);
    setTabIndex(editorFiles.length);
    setEditorFiles([...editorFiles, newFile]);
  };

  const setActiveTab = (tab: number) => {
    if (tab < -1 || tab >= editorFiles.length) {
      return;
    }
    setTabIndex(tab);
  };

  return <>
    <Navbar
      closeFile={closeFile}
      tabIndex={tabIndex}
      editorFiles={editorFiles}
      focusTab={setActiveTab}
    />
    {tabIndex === -1 &&
      <table className="table">
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
    }
    {tabIndex !== -1 &&
      <div>
        {editorFiles[tabIndex].name}
      </div>
    }
  </>;
}

export default App;
export type { File };
