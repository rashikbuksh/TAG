import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const TextEditor = ({ setValue, value, style, placeholder,readOnly }) => {
  // console.log("🚀 ~ BlogEditor ~ value:", value);
  return (
    <div style={style}>
      <ReactQuill 
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        style={{ flex: 1, height: "30%" }}
        readOnly={readOnly}
      />
    </div>
  );
};

export default TextEditor;