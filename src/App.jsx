import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useState } from "react";
import "./App.css";
import EditorToolbar, { formats, modules } from "./Toolbar";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

function App() {
  const [state, setState] = useState({ value: "<h1>Hello</h1>" });
  const handleChange = (content) => {
    setState({ value: content });
  };

  return (
    <div>
      <h1>Mark Down And Editor</h1>
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        className="editor"
        bounds={"#editor"}
        value={state.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />

      {/* <ReactQuill theme="bubble" readOnly value={state.value} /> */}

      {/* <div className="" style={{ padding: 0 }}> */}
      <ReactMarkdown
        className="ql-editor"
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
      >
        {state.value}
      </ReactMarkdown>
      {/* </div> */}
    </div>
  );
}

export default App;
