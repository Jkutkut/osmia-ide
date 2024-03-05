import './i18n/i18n.ts'
import {useState} from 'react';

import Navbar from './components/navbar/Navbar.tsx';
import FileProvider from './context/FileProvider.tsx';
import Body from './components/body/Body.tsx';
import File from './model/File.ts';
import fileHandler from './hooks/fileHandler.tsx';

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

function App() {
  const fHandler = fileHandler();
  const {closeFile, focusTab} = fHandler;
  return <>
    <FileProvider data={fHandler}>
      <Navbar
        closeFile={closeFile}
        focusTab={focusTab}
      />
      <Body />
    </FileProvider>
  </>;
}

export default App;
