
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaRegMessage } from 'react-icons/fa6';

const MainProduct = ({productName,productImage}) => {
    return (
        <div>
            <div className="divider m-0"></div>
      <div className="border-y-2 py-2 text-center border-gray-100">
        <h1 className="text-2xl font-bold">{productName}</h1>
      </div>
      <div className="relative flex items-center justify-center flex-col">
        <img className="h-[200px] w-[200px]" src={productImage} alt="" />
        <div className=" absolute top-3 right-10 badge badge-success gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path d="M36 32.2C18.4 30.1 2.4 42.5 .2 60S10.5 93.6 28 95.8l7.9 1c16 2 28 15.6 28 31.8V160H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V384c0 53 43 96 96 96h32c106 0 192-86 192-192V256c0-53-43-96-96-96H272c-17.7 0-32 14.3-32 32s14.3 32 32 32h16c17.7 0 32 14.3 32 32v32c0 70.7-57.3 128-128 128H160c-17.7 0-32-14.3-32-32V224h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H128V128.5c0-48.4-36.1-89.3-84.1-95.3l-7.9-1z" />
          </svg>
          50
        </div>
      </div>
      <div className="border-y-2 py-2 text-center my-3 border-gray-100 flex justify-around items-center">
        <div>
          <FaRegMessage className="text-xl"></FaRegMessage>
        </div>
        <div className=" divider divider-horizontal"></div>
        <div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 384 512"
            >
              <path d="M36 32.2C18.4 30.1 2.4 42.5 .2 60S10.5 93.6 28 95.8l7.9 1c16 2 28 15.6 28 31.8V160H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V384c0 53 43 96 96 96h32c106 0 192-86 192-192V256c0-53-43-96-96-96H272c-17.7 0-32 14.3-32 32s14.3 32 32 32h16c17.7 0 32 14.3 32 32v32c0 70.7-57.3 128-128 128H160c-17.7 0-32-14.3-32-32V224h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H128V128.5c0-48.4-36.1-89.3-84.1-95.3l-7.9-1z" />
            </svg>{" "}
            <span className="text-xl font-semibold">43</span>
          </div>
        </div>
        <div className="divider divider-horizontal"></div>
        <div>
          <FaMapMarkerAlt className="text-xl"></FaMapMarkerAlt>
        </div>
      </div>
      <button className=" btn  btn-block rounded-none btn-success">
        Add To Cart{" "}
      </button>
        </div>
    );
};

export default MainProduct;