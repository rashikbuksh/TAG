

const HelpAndSupport = () => {
  return (
    <div className="mt-12 flex items-center justify-center bg-gray-100 ">
      <div className="w-full max-w-md bg-white rounded-lg ">
        <div className="flex justify-between items-center border-b p-4">
          <button className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="text-lg font-semibold">Help & Support</h2>
          <button className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.905 18 13V6a6 6 0 10-12 0v7c0 .905-.21 1.79-.595 2.595L4 17h5m6 0v2a3 3 0 11-6 0v-2m6 0H9"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <ul className="space-y-4">
            <li className="border-b">
              <button className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded-lg">
                Live Chat
              </button>
            </li>
            <li className="border-b">
              <button className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded-lg">
                Contact & Support
              </button>
            </li>
            <li className="border-b">
              <button className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded-lg">
                Terms & Conditions
              </button>
            </li>
            <li className="border-b">
              <button className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded-lg">
                Privacy & Policy
              </button>
            </li>
            <li className="border-b">
              <button className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded-lg">
                Refund Policy
              </button>
            </li>
            <li className="border-b">
              <button className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded-lg">
                About Us
              </button>
            </li>
          </ul>
        </div>
       
      </div>
    </div>
  );
};

export default HelpAndSupport;
