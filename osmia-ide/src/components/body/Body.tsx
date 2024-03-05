import {useContext, useEffect, useState} from "react";
import FileContext from "../../context/FileContext";
import FileSelector from "./fileSelector/FileSelector";
import Editor from '@monaco-editor/react';


const Body = () => {
  const FILE_SELECTOR = -1;
  const { tabIndex } = useContext(FileContext);
  const [ height, setHeight ] = useState(0);

  const [ language, setLanguage ] = useState('javascript');

  useEffect(() => {
    const updateHeight = () => {
      const navBarHeight = document.getElementsByTagName('nav')[0]?.clientHeight || 0;
      setHeight(window.innerHeight - navBarHeight);
    };
    window.addEventListener('resize', updateHeight);
    updateHeight();
    return () => window.removeEventListener('resize', updateHeight);
  });

  const handleEditorWillMount = (monaco: any) => {
    console.log("before mount", monaco);
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    console.log("after mount", editor, monaco);
  };

  const handleEditorChange = (value: string | undefined, event: any) => {
    console.log("value changed", value, event);
  };

  const handleEditorValidation = (markers: any) => {
    console.log("markers", markers);
  }

  return <>
    {tabIndex === FILE_SELECTOR &&
      <FileSelector /> ||
      <div>
        <select value={language} onChange={e => {
          setLanguage(e.target.value);
        }}>
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <Editor
          theme="vs-dark"
          height={height}
          defaultLanguage="javascript"
          defaultValue="// some comment"
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          beforeMount={handleEditorWillMount}
          onValidate={handleEditorValidation}
        />
      </div>
    }
  </>;
};

export default Body;
