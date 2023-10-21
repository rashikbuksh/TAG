import React, { useEffect } from "react";

const Welcome = () => {
  useEffect(() => {
    // Redirect to the home page after 2 seconds
    const redirectTimer = setTimeout(() => {
      window.location.href = "/home";
    }, 1500);

    // Clear the timer when the component unmounts
    return () => {
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div className="welcome-slider-wrapper text-center">
      <div className="single-welcome-slide-wrapper">
        <div className="single-welcome-slide">
          <div className="single-welcome-slide__head">
            <div className="logo space-mb--15">
              <img
                src={
                  import.meta.env.VITE_API_PUBLIC_URL + "/assets/img/logo.jpg"
                }
                className="img-fluid w-1/2"
                alt=""
              />
              <p className="text-sm">Beta Version 23.0.1</p> {/* Add this line */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
