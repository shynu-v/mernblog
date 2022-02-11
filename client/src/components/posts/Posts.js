import axios from "axios";
import { useEffect, useState } from "react";

import Post from "../post/Post";
import "./posts.css";

const Posts = () => {

	const [posts, setPosts] = useState([]);
	

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await axios.get("/api/articles");
			setPosts(res.data);
		};
		fetchPosts();
	},[]);

	return (
		<div className='posts'>
			{posts.map((p, key) => (
				<Post post={p}key={key}/>
			))}
		</div>
	);
};

export default Posts;
