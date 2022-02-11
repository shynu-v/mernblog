import "./post.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Post = ({post}) => {
	
	
	const card = (
		<>
			<CardContent>
				<Link to={`/article/${post._id}`} className='link'>
					<Typography variant='h5' component='div'>
						{post.title}
					</Typography>
					<hr />
					<Typography sx={{ mb: 1.5 }} color='text.secondary'>
						{new Date(post.updated).toDateString()}
					</Typography>
					<Typography variant='body2'>{post.content.substring(0,200)} ...</Typography>
				</Link>
			</CardContent>
		</>
	);


	return (
		<div className='post'>
			<Box sx={{ minWidth: 275 }} boxShadow={6}>
				<Card variant='outlined'>{card}</Card>
			</Box>
		</div>
	);
};

export default Post;
