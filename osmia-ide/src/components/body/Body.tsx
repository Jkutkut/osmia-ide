import {useContext, useEffect, useState} from "react";
import {version} from "@/package.json";

import FileContext from "@/src/context/FileContext";
import FileSelector from "./fileSelector/FileSelector";
import Editor from '@monaco-editor/react';

const languages = [
  "text",
  // "TypeScript",
  "JavaScript",
  // "CSS",
  // "LESS",
  // "SCSS",
  "JSON",
  "HTML",
  // "XML",
  // "PHP",
  // "C#",
  // "C++",
  // "Razor",
  // "Markdown",
  // "Diff",
  // "Java",
  // "VB",
  // "CoffeeScript",
  // "Handlebars",
  // "Batch",
  // "Pug",
  // "F#",
  // "Lua",
  // "Powershell",
  // "Python",
  // "Ruby",
  // "SASS",
  // "R",
  // "Objective-C"
].map(l => l.toLowerCase());
languages.sort((a, b) => a.localeCompare(b));

type EditorFile = {
  name: string;
  value: string;
};

const Body = () => {
  const FILE_SELECTOR = -1;
  const { tabIndex, openFiles } = useContext(FileContext);
  const [ height, setHeight ] = useState(0);

  const [ language, setLanguage ] = useState('html');
  const [ editorFiles, setEditorFiles ] = useState<EditorFile[]>([
    {
      name: 'osmia',
      value: "<h1>Hello, world!</h1>\n<p>This is the osmia code editor.</p>",
    },
    {
      name: 'ctx',
      value: `{\n\t\"program\": \"${openFiles[tabIndex]?.name}\",\n\t\"version\": \"${version}\"\n}`,
    },
    {
      name: 'result',
      value: "<!-- The result will be here -->",
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

  const run = () => {
    const data = [
      editorFiles[0],
      editorFiles[1]
    ];
    console.debug(data);
    fetch('/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.text();
    })
    .then(data => {
      console.log(data);
      setEditorFiles(prev => {
        prev[2].value = data;
        return prev;
      });
    })
    .catch(error => console.error(error));
  };

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
            <div className="d-flex flex-row align-items-center justify-content-end">
              {activeFile === editorFiles.length - 1 &&
                <button
                  className="btn"
                  onClick={run}
                >
                  Run
                </button>
              }
              {activeFile !== 1 &&
                <select
                  className="form-select w-50"
                  value={language}
                  onChange={e => {
                    const language = e.target.value;
                    setLanguage(language);
                  }}
                >
                  {languages.map((language, idx) => (
                    <option key={idx} value={language}>{language}</option>
                  ))}
                </select>
              }
            </div>
          </div>
        </div>
        <Editor
          theme="vs-dark"
          height={height}
          
          path={editorFiles[activeFile].name}
          language={activeFile === 1 ? 'json' : language}
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
