import './i18n/i18n.ts'
import {useState} from 'react';

import Navbar from './components/navbar/Navbar.tsx';

function fileGenerator(nbr: number) {
  return Array.from({ length: nbr }, (_, index) => index + 1)
    .map(n => {
      const text_with_n_chars = Array.from({ length: n }, (_, index) => index + 1).join('');
      return {id: `file-${n}`, name: `File ${n} - ${text_with_n_chars}`}
    });
}

function App() {
  const [ openFiles ] = useState(fileGenerator(1));
  const [activeTab, setActiveTab] = useState(-1);
  return <>
    <Navbar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      files={openFiles}
    />
    <br/>
    <Navbar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      files={fileGenerator(2)}
    />
    <br/>
    <Navbar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      files={fileGenerator(5)}
    />
    <br/>
    <Navbar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      files={fileGenerator(10)}
    />
    <br/>
    <Navbar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      files={fileGenerator(100)}
    />
    <br/>
  </>
}

export default App
