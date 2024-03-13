interface Props {
  btns: React.ReactNode,
  toolbar: React.ReactNode
};

const FileEditorNavbar = ({btns, toolbar}: Props) => {
  return (
    <div id="file-editor-navbar" className="d-flex w-100 p-2">
      <div className="d-flex flex-row col-8 gap-2 align-items-center">
        {btns}
      </div>
      <div className="col-4">
        <div className="d-flex flex-row align-items-center justify-content-end gap-2">
          {toolbar}
        </div>
      </div>
    </div>
  );
};

export default FileEditorNavbar;
