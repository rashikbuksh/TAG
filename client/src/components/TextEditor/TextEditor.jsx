import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const TextEditor = ({ setValue, value, style, placeholder }) => {
  console.log("🚀 ~ BlogEditor ~ value:", value);
  return (
    <div style={style}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        style={{ flex: 1, height: "30%" }}
      />
    </div>
  );
};

export default TextEditor;