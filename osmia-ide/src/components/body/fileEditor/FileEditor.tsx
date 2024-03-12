import {useContext, useEffect, useState} from "react";
import {version} from "@/package.json";

import EDITOR_LANGUAGES from "@/src/model/EditorLanguages";
import FileEditorNavbar from "./FileEditorNavbar";
import FileContext from "@/src/context/FileContext";
import MonacoEditor from "./MonacoEditor";
import {OnChange} from "@monaco-editor/react";

enum FileEditorTab {
  OSMIA = 0,
  CTX = 1,
  RESULT = 2
};

const FILE_EDITOR_TABS = [
  'osmia',
  'ctx',
  'result'
];

interface Props {

};

const FileEditor = ({}: Props) => {
  const { tabIndex, openFiles } = useContext(FileContext);
  const [ language, setLanguage ] = useState('html');
  const [ activeFile, setActiveFile ] = useState<FileEditorTab>(FileEditorTab.OSMIA);
  const [ code, setCode ] = useState([
    "<h1>Hello, world!</h1>\n<p>This is the osmia code editor.</p>",
    "",
    "<!-- The result will be here -->"
  ]);

  useEffect(() => {
    setCode(oldCode => {
      oldCode[FileEditorTab.CTX] = `{\n\t\"program\": \"${openFiles[tabIndex]?.name}\",\n\t\"version\": \"${version}\"\n}`;
      return oldCode;
    });
  }, [tabIndex]);

  const run = () => {
    const data = [
      code[FileEditorTab.OSMIA],
      code[FileEditorTab.CTX]
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
      setCode(prev => {
        prev[FileEditorTab.RESULT] = data;
        return prev;
      });
    })
    .catch(error => console.error(error));
  };

  const save = () => {
    console.warn('save: not implemented');
  }

  const changeTab = (tab: FileEditorTab) => {
    if (tab < 0 || tab >= FILE_EDITOR_TABS.length) {
      return;
    }
    save();
    setActiveFile(tab);
  };

  const onInputChange: OnChange = (value, ev) => {
    console.log(value, ev);
  };

  return (
    <div>
      <FileEditorNavbar
        btns={<>{FILE_EDITOR_TABS.map((tabName, idx) => (
          <button
            key={idx}
            className="btn"
            disabled={idx === activeFile}
            onClick={() => changeTab(idx)}
          >
            {tabName}
          </button>
        ))}</>}
        toolbar={<>
          {activeFile === FileEditorTab.RESULT &&
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
        path={FILE_EDITOR_TABS[activeFile]}
        language={activeFile === 1 ? 'json' : language}
        defaultValue={code[activeFile]}
        onChange={onInputChange}
        loading={<div>Loading...</div>}
      />
    </div>
  );
};

export default FileEditor;
