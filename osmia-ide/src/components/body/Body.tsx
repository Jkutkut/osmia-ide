import {useContext, useEffect, useState} from "react";
import {version} from "../../../package.json";

import FileContext from "../../context/FileContext";
import FileSelector from "./fileSelector/FileSelector";
import Editor from '@monaco-editor/react';

const languages = [
  "TypeScript",
  "JavaScript",
  "CSS",
  "LESS",
  "SCSS",
  "JSON",
  "HTML",
  "XML",
  "PHP",
  "C#",
  "C++",
  "Razor",
  "Markdown",
  "Diff",
  "Java",
  "VB",
  "CoffeeScript",
  "Handlebars",
  "Batch",
  "Pug",
  "F#",
  "Lua",
  "Powershell",
  "Python",
  "Ruby",
  "SASS",
  "R",
  "Objective-C"
].map(l => l.toLowerCase());
languages.sort((a, b) => a.localeCompare(b));

type EditorFile = {
  name: string;
  language: string;
  value: string;
};

const Body = () => {
  const FILE_SELECTOR = -1;
  const { tabIndex, openFiles } = useContext(FileContext);
  const [ height, setHeight ] = useState(0);

  const [ editorFiles, setEditorFiles ] = useState<EditorFile[]>([
    {
      name: 'osmia',
      language: 'html',
      value: "<h1>Hello, world!</h1>\n<p>This is the osmia code editor.</p>"
    },
    {
      name: 'ctx',
      language: 'json',
      value: `{\n\t\"program\": \"${openFiles[tabIndex]?.name}\",\n\t\"version\": \"${version}\"\n}`
    },
    {
      name: 'result',
      language: 'javascript',
      value: "// Result will be here"
    }
  ]);
  const [ activeFile, setActiveFile ] = useState(0);

  useEffect(() => {
    setEditorFiles(fs => {
      fs[1].value = `{\n\t\"program\": \"${openFiles[tabIndex]?.name}\",\n\t\"version\": \"${version}\"\n}`;
      return fs;
    });
  }, [tabIndex]);

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
        <div className="d-flex w-100 p-2">
          <div className="d-flex flex-row col-8 align-items-center">
            {editorFiles.map((file, idx) => (
              <button
                key={idx}
                className="btn"
                disabled={idx === activeFile}
                onClick={() => setActiveFile(idx)}
              >
                {file.name}
              </button>
            ))}
          </div>
          <div className="col-4">
            <div className="d-flex flex-row align-items-center">
              <span className="flex-nowrap w-50">
                Active language: <i>{editorFiles[activeFile].language}</i>
              </span>
              <select
                className="form-select w-50"
                value={editorFiles[activeFile].language}
                onChange={e => {
                  const language = e.target.value;
                  setEditorFiles(prev => {
                    prev[activeFile].language = language;
                    return [...prev];
                  });
                }}
              >
                {languages.map((language, idx) => (
                  <option key={idx} value={language}>{language}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <Editor
          theme="vs-dark"
          height={height}
          
          path={editorFiles[activeFile].name}
          language={editorFiles[activeFile].language}
          defaultValue={editorFiles[activeFile].value}
          
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
