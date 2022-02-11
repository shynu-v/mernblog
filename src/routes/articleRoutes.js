const articleModel = require("../models/articleModel");
const feedbackModel = require("../models/feedbackModel");

const routes = require("express").Router();

routes.get('/articles',async(req,res)=>{
    try {
        const result = await articleModel.find().select(" -__v");
        res.status(200).json(result);
        
    } catch (error) {
        res.status(500).json(error);
    }
})

routes.get('/articles/:id',async(req,res)=>{
    try {
        const result = await articleModel.findOne({ _id: req.params.id });
        const feed = await feedbackModel.findOne({name:result._id}).select("-_id -__v");
        const {_id , __v, ...article} = result._doc;
        const{name, ...feedbaack} = feed._doc;
        res.status(200).json({...article, ...feedbaack });
    } catch (error) {
        res.status(500).json(error);
    }
})

routes.post('/articles/:id/upvote', async(req,res)=>{
    try {
        const result = await articleModel.findOne({ _id: req.params.id });
		const feed = await feedbackModel.findOne({ name: result._id });
        if (feed.upvotes.includes(req.body.userId)) {
		    await feed.updateOne({ $pull: { upvotes: req.body.userId } });
		} else {
			await feed.updateOne({ $push: { upvotes: req.body.userId } });
		}
        const vote = await feedbackModel.findOne({ name: result._id });
        res.status(200).json(vote.upvotes)
        
    } catch (error) {
        res.status(500).json(error);
    }
})

routes.post("/articles/:id/comment", async (req, res) => {
    const {username,txt} = req.body;
    console.log(req.body)
	try {
		const result = await articleModel.findOne({ _id: req.params.id });
		const feed = await feedbackModel.findOne({ name: result._id }).select("comments");
		feed.comments.push({username,txt});
		await feed.save();
		res.status(200).json(feed.comments);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = routes;