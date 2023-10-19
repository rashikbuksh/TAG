import Axios from "axios";
import React, { useEffect, useState } from "react";
import NewsFeedInput from "../../components/NewsFeedInput/NewsFeedInput";
import { api } from "../../lib/api";
import PostUi from "../PostUi/PostUi";
import TagNewsUi from "../PostUi/TagNewsUi";
import { FaArrowUp } from "react-icons/fa";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleNewsInput = () => {
    setIsOpen(!isOpen);
  };

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    api.get("/news/getnews")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [posts]);

  return (
    <div className="mt-20">
      <div className="mx-auto w-[90%]">
        <h1 className="text-center text-2xl font-bold">News</h1>
        <div className="divider"></div>
        <div className="lg:grid lg:grid-cols-12 ">
          <div className="lg:col-span-3"></div>
          <div className="lg:col-span-6">
            <div
              onClick={handleNewsInput}
              className="w-full bg-white border rounded p-4 shadow-md mb-4"
            >
              {"Write Post"}
            </div>
            <NewsFeedInput isOpen={isOpen} setIsOpen={setIsOpen}></NewsFeedInput>
            <div>
              {posts.map((postData, index) =>
                postData.category === "regular" ? (
                  <PostUi key={index} postData={postData} />
                ) : (
                  <TagNewsUi key={index} postData={postData} />
                )
              )}
            </div>
          </div>
          <div className="lg:col-span-3"></div>
        </div>
      </div>
      <div className="h-24"></div>

      {showScrollButton && (
        <button
          className="fixed right-5 bottom-24 z-20 bg-white bg-opacity-50 p-2 rounded-full shadow-lg"
          onClick={handleSmoothScroll}
        >
          <FaArrowUp className="text-3xl text-gray-200"></FaArrowUp>
        </button>
      )}
    </div>
  );
};

export default NewsFeed;
