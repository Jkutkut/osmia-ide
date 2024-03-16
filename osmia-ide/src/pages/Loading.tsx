const Loading = () => {
  return <>
    <div className="d-flex justify-content-center h-100 align-items-center">
      <div className="spinner-border" role="status"
        style={{ width: '3rem', height: '3rem' }}
      >
        <span className="sr-only"></span>
      </div>
    </div>
  </>;
};

export default Loading;
