

const AddContact = () => {
    return (
      <div className="flex flex-col h-screen bg-gray-50 mt-16">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <button className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
          <h2 className="text-lg font-semibold">Add Contact</h2>
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
  
        {/* Content */}
        <div className="flex-1 ">
          <div className="mb-6 mx-2 ">
            <input
              type="text"
              placeholder="TAG ID/Mobile No"
              className="w-full p-3 mt-2 text-black bg-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-2 text-center text-gray-500">My TAG ID: tg078767</p>
          </div>
  
          <div className="space-y-2">
            <button className="w-full py-2 text-lg text-left  rounded-lg border-b-2 px-4 ">
              Scan
              <p className="text-sm text-gray-500 ">Scan Contact QR Code</p>
            </button>
  
            <button className="w-full py-2 text-lg text-left  rounded-lg border-b-2 px-4">
              Mobile Contacts
              <p className="text-sm text-gray-500">Add from mobile address book</p>
            </button>
          </div>
        </div>
      </div>
    );
  };

export default AddContact;
