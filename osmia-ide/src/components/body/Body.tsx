import {useContext, useEffect, useRef, useState} from "react";
import FileContext from "../../context/FileContext";
import FileSelector from "./fileSelector/FileSelector";
import Editor from '@monaco-editor/react';


const files = {
  'script.js': {
    selectorName: "JavaScript",
    name: 'script.js',
    language: 'javascript',
    value: "console.log('Hello, world!');",
  },
  'ctx.json': {
    selectorName: "JSON",
    name: 'ctx.json',
    language: 'json',
    value: "{\n\t\"key\": \"value\"\n}"
  },
  'style.css': {
    selectorName: "CSS",
    name: 'style.css',
    language: 'css',
    value: "body { background-color: #333; }",
  },
  'index.html': {
    selectorName: "HTML",
    name: 'index.html',
    language: 'html',
    value: '<h1>Hello, world!</h1>',
  },
  'plain.txt': {
    selectorName: "Plain",
    name: 'plain.txt',
    language: 'plaintext',
    value: "Hello, world!",
  },
};

const filesArray = Object.entries(files).map(([_, file]) => file);

const Body = () => {
  const FILE_SELECTOR = -1;
  const { tabIndex } = useContext(FileContext);
  const [ height, setHeight ] = useState(0);

  // const editorRef = useRef<any>(null);
  // const [ language, setLanguage ] = useState("js");
  const [ fileName, setFileName ] = useState<string>("script.js");
  const file = files[fileName];

  useEffect(() => {
    const updateHeight = () => {
      const navBarHeight = document.getElementsByTagName('nav')[0]?.clientHeight || 0;
      setHeight(window.innerHeight - navBarHeight);
    };
    window.addEventListener('resize', updateHeight);
    updateHeight();
    return () => window.removeEventListener('resize', updateHeight);
  });

  return <>
    {tabIndex === FILE_SELECTOR &&
      <FileSelector /> ||
      <div>
        <select value={fileName} onChange={e => {
          setFileName(e.target.value);
        }}>
          {filesArray.map((file, idx) => (
            <option key={idx} value={file.name}>{file.selectorName}</option>
          ))}
        </select>
        <Editor
          theme="vs-dark"
          height={height}
          // path={file.name}
          // defaultLanguage={file.language}
          // defaultValue={file.value}
          language={file.language}
          // value={file.value}
          // path={file.name}
          loading={
            <div>
              Loading...
            </div>
          }
          // options={{}}
          // overrideServices={{}}
          // onChange={handleEditorChange}
          // onMount={handleEditorDidMount}
          // beforeMount={handleEditorWillMount}
          // onValidate={handleEditorValidation}
        />
      </div>
    }
  </>;
};

export default Body;
