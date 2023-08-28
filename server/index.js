const crud = require("./crud");

const { app } = require("./config/app");

const multer = require("multer");

var productImage = null;

const storage = multer.diskStorage({
	destination: (req, file, callBack) => {
		if (file.mimetype.substring(0, 5) == "image") {
			callBack(null, "./uploads");
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
			console.log(productImage);
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
			console.log(productImage);
			return res.status(200).json({ msg: "File Uploaded", productImage });
		}
	}
);
