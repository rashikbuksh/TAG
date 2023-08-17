/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { FaCamera } from "react-icons/fa6";
import{ useRef } from "react";
import JoditEditor from "jodit-react";
const NewsFeedInput = () => {
  const [cameraError, setCameraError] = useState(null);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  // const config = useMemo(
  //   {
  //     readonly: false, // all options from https://xdsoft.net/jodit/docs/,
  //     placeholder:  "Start typings...",
  //   },
  //   []
  // );
  const handleCameraClick = async () => {
   
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // Use the stream to display the camera feed or take further actions
      // For example, you could create a video element and set its srcObject to the stream.

      setCameraError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraError("Camera access denied. Please grant camera permission.");
    }
  };
  return (
    <div onClick={() => window.my_modal_3.showModal()}>
      <div className="flex items-center p-4 border border-gray-200 rounded-lg">
        <div className="mr-4">
          <FaCamera
            className="text-2xl cursor-pointer"
            onClick={handleCameraClick}
          />
        </div>
        <div className="flex-grow">
          <input
            type="text"
            id=""
            className="w-full border-none bg-transparent placeholder-gray-500 focus:outline-none"
            placeholder="Write post"
            disabled
          />
        </div>
        <div className="ml-4 flex items-center">
          <label className="cursor-pointer" htmlFor="fileInput">
            <FaFileUpload className="text-2xl" />
          </label>
          <input type="file" id="fileInput" className="hidden" />
        </div>
      </div>
      {cameraError && <p className="text-red-500 mt-2">{cameraError}</p>}
      <div className="divider"></div>
      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <JoditEditor
            ref={editor}
            value={content}
            // config={config}
            tabIndex={100} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => setContent(newContent)}
          />
        </form>
      </dialog>
    </div>
  );
};

export default NewsFeedInput;
