const crud = require("./crud");
const express = require("express");
const { app, ExecuteQuery } = require("./config");
const axios = require("axios");
const multer = require("multer");
var productImage = null;
var http = require("http");
var querystring = require("querystring");
// upload multiple image
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    if (file.mimetype.substring(0, 5) === "image") {
      callBack(null, "./uploads/products");
    }
  },
  filename: (req, file, callBack) => {
    if (file.mimetype.substring(0, 5) === "image") {
      productImage = Date.now() + "__" + file.originalname;
      callBack(null, productImage);
    }
  },
});

const upload = multer({ storage: storage });

app.post(
  "/imageUpload/uploadproductimage",
  upload.array("uploadFiles", 3), // Limit to 3 files
  (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "No files uploaded" });
    }

    // Process uploaded files
    const imageNames = req.files.map((file) => file.filename);
    return res.status(200).json({ msg: "Files Uploaded", imageNames });
  }
);
//upload single product image
const ProductStorage = multer.diskStorage({
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
const ProductUpload = multer({ storage: ProductStorage });

app.post(
  "/imageUpload/uploadProductImage/update",
  ProductUpload.array("uploadFiles"),
  (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    } else {
      return res.status(200).json({ msg: "File Uploaded", productImage });
    }
  }
);
// news upload
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
  const { number, message } = req.body;
  var postData = querystring.stringify({
    token: process.env.API_KEY_SMS,
    to: `+88${number}`,
    message: message,
  });

  var options = {
    hostname: "api.greenweb.com.bd",
    path: "/api.php",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": postData.length,
    },
  };

  var req = http.request(options, function (res) {
    res.setEncoding("utf8");

    res.on("data", function (chunk) {
      console.log("BODY:", chunk);
    });

    res.on("end", function () {});
  });

  req.on("error", function (e) {
    console.log("Problem with request:", e.message);
  });

  req.write(postData);
  req.end();
});
