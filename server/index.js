const crud = require("./crud");
const express = require("express");
const { app, ExecuteQuery } = require("./config");
const axios = require("axios");
const multer = require("multer");
const base_url = "";
var productImage = null;

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    if (file.mimetype.substring(0, 5) == "image") {
      callBack(null, "./uploads/products");
    }
  },
  filename: (req, file, callBack) => {
    if (file.mimetype.substring(0, 5) == "image") {
      productImage = Date.now() + "__" + file.originalname;
      callBack(null, productImage);
    }
  },
});
const upload = multer({ storage: storage });

app.post(
  "/imageUpload/uploadproductimage",
  upload.array("uploadFiles"),
  (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    } else {
      return res.status(200).json({ msg: "File Uploaded", productImage });
    }
  }
);

const storage1 = multer.diskStorage({
  destination: (req, file, callBack) => {
    if (file.mimetype.substring(0, 5) == "image") {
      callBack(null, "./uploads/newsimage");
    }
  },
  filename: (req, file, callBack) => {
    if (file.mimetype.substring(0, 5) == "image") {
      productImage = Date.now() + "__" + file.originalname;
      callBack(null, productImage);
    }
  },
});
const upload1 = multer({ storage: storage1 });

app.post(
  "/imageUpload/newsImageUpload",
  upload1.array("uploadFiles"),
  (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    } else {
      return res.status(200).json({ msg: "File Uploaded", productImage });
    }
  }
);

const storage2 = multer.diskStorage({
  destination: (req, file, callBack) => {
    if (file.mimetype.substring(0, 5) == "image") {
      callBack(null, "./uploads/heroslider");
    }
  },
  filename: (req, file, callBack) => {
    if (file.mimetype.substring(0, 5) == "image") {
      productImage = Date.now() + "__" + file.originalname;
      callBack(null, productImage);
    }
  },
});
const upload2 = multer({ storage: storage2 });

app.post(
  "/imageUpload/heroSliderImageUpload",
  upload2.array("uploadFiles"),
  (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    } else {
      return res.status(200).json({ msg: "File Uploaded", productImage });
    }
  }
);

const storage3 = multer.diskStorage({
  destination: (req, file, callBack) => {
    if (file.mimetype.substring(0, 5) == "image") {
      callBack(null, "./uploads/usersProfilePic");
    }
  },
  filename: (req, file, callBack) => {
    if (file.mimetype.substring(0, 5) == "image") {
      profileImage = Date.now() + "__" + file.originalname;
      callBack(null, profileImage);
    }
  },
});
const upload3 = multer({ storage: storage3 });
app.post(
  "/imageUpload/uploadprofileimage",
  upload3.array("uploadFiles"),
  (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    } else {
      return res.status(200).json({ msg: "File Uploaded", profileImage });
    }
  }
);
app.use(express.json()); // Middleware to parse JSON requests

app.post("/sentOtp", async (req, res) => {
  const { number } = req.body;

  const requestBody = {
    phone: number, // Assuming 'number' is the phone number received in the request body
    gateway_key: "7a3686f9-6423-442e-bdb7-847b7979f447",
  };

  try {
    const response = await axios.post(
      `https://api.fazpass.com/v1/otp/request`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
		  'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoxMDcyfQ.jcQ5hDOOYvS2_lpIerPEnj-Eop9y2dVdeJspmVQro-Y`
        },
      }
    );

    // Handle response data accordingly
    console.log(response);

    // Respond to the client with the data received from the external API
    res
      .status(200)
      .json({ message: "OTP request sent successfully", data: response.data });
  } catch (error) {
    // Handle error
    console.log( error);
    console.error("There was a problem with the request:", error.message);

    // Respond with an error status to the client
    res.status(500).json({ error: "Failed to send OTP request" });
  }
});
