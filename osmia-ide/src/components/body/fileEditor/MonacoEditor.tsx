import Editor, {OnChange} from '@monaco-editor/react';
import {useEffect, useState} from "react";

interface Props {
  path: string;
  language: string;
  defaultValue: string;
  onChange: OnChange;
  loading: React.ReactNode;
};

const MonacoEditor = ({
  path,
  language,
  defaultValue,
  onChange,
  loading
}: Props) => {
  const [ height, setHeight ] = useState(0);
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
    <Editor
      theme="vs-dark"
      height={height}
      onChange={onChange}
      path={path}
      language={language}
      defaultValue={defaultValue}
      loading={loading}
      // options={{}}
      // overrideServices={{}}
      // onChange={handleEditorChange}
      // onMount={handleEditorDidMount}
      // beforeMount={handleEditorWillMount}
      // onValidate={handleEditorValidation}
    />
  </>;
};

export default MonacoEditor;
