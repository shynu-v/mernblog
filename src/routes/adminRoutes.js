const articleModel = require("../models/articleModel");
const feedbackModel = require("../models/feedbackModel");
const routes = require("express").Router();

routes.post("/article/add",async(req,res)=>{
    try {
        const article = new articleModel({
					name: req.body.name,
					title: req.body.title,
					content: req.body.content,
				});
		await article.save();
        const feed = new feedbackModel({
            name:article._id
        })
        await feed.save();
		res.status(200).json("article added");
    } catch (error) {
        res.status(500).json(error);
    }

    
})

routes.delete("/article/:id/delete", async (req, res) => {
	try {
		const article = await articleModel.findOne({_id:req.params.id});
        await feedbackModel.findOneAndDelete({name: article._id});
        await articleModel.findOneAndDelete({ _id: req.params.id });
		res.status(200).json("article deleted");
	} catch (error) {
		res.status(500).json(error);
	}
});

routes.put("/article/:id/edit", async (req, res) => {
	
	const{newPost,admin}=req.body
	try {
		if(newPost.title ==="" || newPost.content === ""){
			res.json("No Empty Fields");
		}else{
			if (admin) {
				const article = {
					name: newPost.name,
					title: newPost.title,
					content: newPost.content,
					updated: Date.now(),
				};
				articleModel.findByIdAndUpdate({ _id: req.params.id }, article, function (err, data) {
					if (err) {
						res.json( "Failed" );
					} else if (data.n == 0) {
						res.json( "No match Found" );
					} else {
						res.status(200).json("article updated");
					}
				});
			} else {
				res.status(401).json("Not authorized");
			}
		}
		
		
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = routes;