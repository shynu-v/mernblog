const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/myblog", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    title:String,
    content: String,
    updated:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('articles',articleSchema);