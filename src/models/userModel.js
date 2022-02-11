const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/myblog", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email:{
        type: String,
        required: true,
    },
    passwd:{
        type: String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
});

module.exports = mongoose.model("userdatas", userSchema);
