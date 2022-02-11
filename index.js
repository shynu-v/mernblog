const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const mongoose = require("mongoose");
mongoose.connect(
	"mongodb+srv://shynu:KabFSjVr6J56GBuq@library.i9mll.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
	}
);

// mongoose.connect("mongodb://localhost:27017/myblog", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

const articleRoutes = require("./src/routes/articleRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const userRoutes = require("./src/routes/usersRoutes");



const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/api", articleRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(PORT);
})