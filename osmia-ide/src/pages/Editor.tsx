import '@/src/i18n/i18n.ts'

import Navbar from '@/src/components/navbar/Navbar.tsx';
import FileProvider from '@/src/context/FileProvider.tsx';
import Body from '@/src/components/body/Body.tsx';
import useFileHandler from '@/src/hooks/useFileHandler.tsx';

const Editor = () => {
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
};

export default Editor;
