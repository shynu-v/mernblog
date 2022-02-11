import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Comment from '../comments/Comment';
import Commentform from '../comments/Commentform';
import Upvote from '../upvotes/Upvote';
import './articlesing.css'

const Articlesing = ({ userid, user, admin }) => {
	const [post, setPost] = useState({});
	const [upvote, setupvote] = useState({ upvotes: [] });
	const [cmmt, setcmmt] = useState({ comments: [] });
	const { id } = useParams();

	useEffect(() => {
		const getPost = async () => {
			const res = await axios.get("/api/articles/" + id);
			setPost(res.data);
			setupvote({ upvotes: res.data.upvotes });
			setcmmt({ comments: res.data.comments });
		};
		getPost();
	}, [id]);

	return (
		<div className='singlePost'>
			<div className='singlePostWrapper'>
				<h1 className='singlePostTitle'>{post.title}</h1>
				{admin ? (
					<div>
					<h3>
						<Link to={`/article/${id}/edit`}>Edit</Link>
					</h3>
					<h3><Link to={`/article/${id}/delete`}>Delete</Link></h3>
					</div>
				) : null}
				<div className='singlePostInfo'>
					<span className='singlePostDate'>{new Date(post.updated).toDateString()}</span>
				</div>
				<p className='singlePostDesc'>{post.content}</p>
				<div className='singlePostInfo'>
					<span className='singlePostDate'>Author:{post.name}</span>
				</div>
			</div>
			<Upvote articlename={id} userId={userid} vote={upvote.upvotes.length} setupvote={setupvote} />
			<Comment comments={cmmt.comments} />
			<Commentform id={id} user={user} setcmmt={setcmmt} />
		</div>
	);
};

export default Articlesing;