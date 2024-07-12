import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useState } from "react";
import "./App.css";
import EditorToolbar, { formats, modules } from "./Toolbar";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { Toaster, toast } from "sonner";

function App() {
    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    const [isModeSource, setIsModeSource] = useState(true);

    const handleChange = (content, delta, source, editor) => {
        const text = editor.getText();
        setText(text);
        setValue(content);
    };

    const handleCopyClipboard = () => {
        navigator.clipboard.writeText(isModeSource ? value : text);
        toast.success("Copied to clipboard");
    };

    return (
        <div>
            <Toaster position="top-right" richColors />

            <h1>Mark Down And Editor</h1>

            <EditorToolbar />

            <ReactQuill
                theme="snow"
                className="editor"
                bounds={"#editor"}
                value={value}
                onChange={handleChange}
                placeholder={"Write something awesome..."}
                modules={modules}
                formats={formats}
            />

            <div className="mt-2">
                <h2>Output</h2>

                <button className="button-success mb-1" onClick={handleCopyClipboard}>
                    Copy
                </button>

                <button
                    className="button-primary mb-1 ml-1"
                    onClick={() => setIsModeSource(!isModeSource)}
                >
                    {isModeSource ? "Show text" : "Show source code"}
                </button>

                {isModeSource ? (
                    <textarea
                        name=""
                        className="ql-editor custom-textarea"
                        id=""
                        value={value}
                        readOnly
                    />
                ) : (
                    <ReactMarkdown
                        className="ql-editor custom-textarea"
                        rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    >
                        {value}
                    </ReactMarkdown>
                )}
            </div>
        </div>
    );
}

export default App;
