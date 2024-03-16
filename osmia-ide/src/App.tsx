import {Navigate, Route, Routes, useSearchParams} from "react-router-dom";
import Editor from "./pages/Editor";

const App = () => {
  console.log("App");
  return <>
    <Routes>
      <Route path="/" element={<Navigate to="/editor"/>}/>
      <Route path="/editor" element={<Editor/>}/>

      <Route path="/*" element={<Navigate to="/"/>}/>
    </Routes>
  </>;
}

export default App;
