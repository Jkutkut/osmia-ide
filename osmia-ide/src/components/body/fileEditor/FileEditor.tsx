import {useContext, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {OnChange} from "@monaco-editor/react";

import EDITOR_LANGUAGES from "@/src/model/EditorLanguages";
import FileContext from "@/src/context/FileContext";
import debounce from "@/src/tools/debounce";
import MonacoEditor from "./MonacoEditor";
import FileEditorNavbar from "./FileEditorNavbar";

const AUTO_SAVE_DELAY = 1500;

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
  const { t } = useTranslation();
  const {
    tabIndex, openFiles,
    changeCurrentFileLanguage,
    saveCurrentFileContent
  } = useContext(FileContext);
  const [ activeFile, setActiveFile ] = useState<FileEditorTab>(FileEditorTab.OSMIA);
  const [ contentModified, setContentModified ] = useState<boolean>(false);
  const language = openFiles[tabIndex].osmiaLanguage;
  const code = openFiles[tabIndex].osmia;

  const autoSave = useRef(
    debounce((fileIdx: number, value: string) => {
      saveCurrentFileContent(fileIdx, value);
      setContentModified(false);
    }, AUTO_SAVE_DELAY)
  ).current;

  const run = () => {
    /*
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
    */
    console.warn('run: not implemented');
  };

  const changeTab = (tab: FileEditorTab) => {
    if (tab < 0 || tab >= FILE_EDITOR_TABS.length) {
      return;
    }
    setActiveFile(tab);
  };

  const onInputChange: OnChange = (value, _) => {
    if (!value) {
      return;
    }
    setContentModified(true);
    autoSave(activeFile, value);
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
            {contentModified && idx === activeFile &&
              <span className="badge ms-2">
                {t('body.editor.modified.label')}
              </span>
            }
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
                changeCurrentFileLanguage(language);
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
