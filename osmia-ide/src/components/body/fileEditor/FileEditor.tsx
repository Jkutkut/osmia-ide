import {useContext, useEffect, useState} from "react";
import {version} from "@/package.json";

import EDITOR_LANGUAGES from "@/src/model/EditorLanguages";
import FileEditorNavbar from "./FileEditorNavbar";
import FileContext from "@/src/context/FileContext";
import MonacoEditor from "./MonacoEditor";

type EditorFile = {
  name: string;
  value: string;
};


interface Props {

};

const FileEditor = ({}: Props) => {
  const { tabIndex, openFiles } = useContext(FileContext);
  const [ language, setLanguage ] = useState('html');
  const [ editorFiles, setEditorFiles ] = useState<EditorFile[]>([
    {
      name: 'osmia',
      value: "<h1>Hello, world!</h1>\n<p>This is the osmia code editor.</p>",
    },
    {
      name: 'ctx',
      value: "",
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

  return (
    <div>
      <FileEditorNavbar
        btns={<>{editorFiles.map((file, idx) => (
          <button
            key={idx}
            className="btn"
            disabled={idx === activeFile}
            onClick={() => setActiveFile(idx)}
          >
            {file.name}
          </button>
        ))}</>}
        toolbar={<>
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
              {EDITOR_LANGUAGES.map((language, idx) => (
                <option key={idx} value={language}>{language}</option>
              ))}
            </select>
          }
        </>}
      />
      <MonacoEditor
        path={editorFiles[activeFile].name}
        language={activeFile === 1 ? 'json' : language}
        defaultValue={editorFiles[activeFile].value}
        loading={<div>Loading...</div>}
      />
    </div>
  );
};

export default FileEditor;
