const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/myblog", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    name:{
        type: Schema.Types.ObjectId,
        ref:"articles"
    },
    upvotes:{
        type:Array,
        default:[]
    },
    comments:[]
})

module.exports = mongoose.model("feedbacks",feedbackSchema);