/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { FaCamera } from "react-icons/fa6";
const NewsFeedInput = () => {
  const [cameraError, setCameraError] = useState(null);
  const [content, setContent] = useState("");
  
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
  const handlePostClick = () => {
    console.log("Textarea content:", content); // Log the content to the console
  };
  return (
    <div >
      <div  className="flex items-center p-4 border border-gray-200 rounded-lg">
        <div onClick={() => window.openNewsInput.showModal()} className="flex-grow">
          <div className="w-full border-none bg-transparent placeholder-gray-500 focus:outline-none" />
          {content||"write Post" }
        </div>
      </div>
     <div className="flex justify-end">
     <button
        className="inline-block rounded border border-current px-8 my-2 py-3 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
        onClick={handlePostClick} // Call the function when the button is clicked
      >
        Post 
      </button>
     </div>
      {cameraError && <p className="text-red-500 mt-2">{cameraError}</p>}
      <div className="divider"></div>

      <dialog id="openNewsInput" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h1 className="text-xl">Write Your Post</h1>
          <div className="flex justify-between my-3">
            <div className="mr-4">
              <FaCamera
                className="text-2xl cursor-pointer text-blue-400"
                onClick={handleCameraClick}
              />
            </div>
            <div className="ml-4 flex items-center">
              <label className="cursor-pointer" htmlFor="fileInput">
                <FaFileImage className="text-2xl text-blue-400" />
              </label>
              <input type="file" id="fileInput" className="hidden" />
            </div>
          </div>
          <div className=" border-2 border-gray-200 rounded-md">
            <label className="sr-only">Message</label>

            <textarea
          className="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Message"
          rows="8"
          id="message"
          value={content} // Set the textarea value from the state
          onChange={(e) => setContent(e.target.value)} // Update the state when the textarea changes
        ></textarea>
      </div>
      <button
        className="btn btn-block bg-blue-500 hover:bg-blue-400 my-2"
        onClick={handlePostClick} // Call the function when the button is clicked
      >
        Post
      </button>
        </form>
      </dialog>
    </div>
  );
};

export default NewsFeedInput;
