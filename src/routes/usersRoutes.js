const userModel = require("../models/userModel");
const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt =require("bcrypt");


const verifyJWT = (req,res,next) =>{
	const token = req.headers["x-access-token"]?.split(' ')[1];
	if(token){
		jwt.verify(token, process.env.PASSPORTSECRET, (err,decoded) =>{
			if(err) return res.json({
				loggedin: false,
				message: "Failed to authenticate"
			})
			req.user = {};
			req.user.id = decoded.id
			req.user.username = decoded.name
			req.user.isAdmin = decoded.isAdmin
			next()
		})
	}else{
		res.json({message: "Incorrect Token Given", loggedin:false})
	}
}



routes.post('/reg', async(req,res)=>{
    try {

		const takenmail = await userModel.findOne({email: req.body.email});
		if(takenmail){
			res.json({message:"Email has already been taken"})
		}else{
			password = await bcrypt.hash(req.body.passwd, 10)
			const user = new userModel({
				name: req.body.name,
				email: req.body.email,
				passwd: password,
			});
			await user.save();
			res.status(200).json("User added");
		}    
    } catch (error) {
        res.status(500).json(error);
    }
})

routes.post('/login', async(req,res)=>{
	try {
		const {email,passwd} = req.body;
		userModel.findOne({email:email})
		.then(user =>{
			if(!user){
				return res.json({message:"Invalid Email or Password"})
			}
			bcrypt.compare(passwd, user.passwd)
			.then(isvalid =>{
				if(isvalid){
					const payload = {
						id: user._id,
						name:user.name,
						isAdmin:user.isAdmin
					}
					console.log(payload)
					jwt.sign(
						payload,
						process.env.JWT_SECRET,
						{expiresIn: 86400},
						(err,token) =>{
							if(err) return res.json({message:err})
							return res.json({
								message:"Success",
								token: "Bearer " + token,
							})
						}
					)
				}else{
					return res.json({message:"Invalid Email or Password"})
				}
			})
		})
	} catch (error) {
		 res.status(500).json(error);
	}
})

routes.get("/getname", verifyJWT, (req,res)=>{
	res.json({ loggedin: true, username: req.user.username, isAdmin: req.user.isAdmin, id: req.user.id});
})

module.exports = routes;