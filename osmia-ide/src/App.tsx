import './i18n/i18n.ts'

import Navbar from './components/navbar/Navbar.tsx';
import FileProvider from './context/FileProvider.tsx';
import Body from './components/body/Body.tsx';
import useFileHandler from './hooks/useFileHandler.tsx';

function App() {
  const fHandler = useFileHandler();
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
