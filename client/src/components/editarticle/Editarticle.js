import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Editarticle = ({ user,admin}) => {

    const navigate = useNavigate();
	const [title, settitle] = useState("");
	const [content, setcontent] = useState("");
    const { id } = useParams();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newPost = {
			name: user,
			title: title,
			content: content,
		};

		try {
			 const res=await axios.put(`/admin/article/${id}/edit`, {newPost, admin}, {
				headers: {
					"Content-Type": "application/json",
				},
			});
            alert(res.data)
            if (res.data !== "No Empty Fields") navigate(`/article/${id}`);
		} catch (err) {}
	};

    useEffect(() => {
			const getPost = async () => {
				const res = await axios.get("/api/articles/" + id);
				settitle(res.data.title);
                setcontent(res.data.content)
			};
			getPost();
		}, [id]);

	return (
		<div className='write'>
			<form className='writeForm' onSubmit={handleSubmit}>
				<div className='writeFormGroup'>
					<input
						type='text'
						placeholder='Title'
						className='writeInput'
						autoFocus={true}
                        value={title}
						onChange={(e) => settitle(e.target.value)}
					/>
				</div>
				<div className='writeFormGroup'>
					<textarea
						placeholder='Tell your story...'
						type='text'
						className='writeInput writeText'
                        value={content}
						onChange={(e) => setcontent(e.target.value)}
					></textarea>
				</div>
				<button className='writeSubmit' type='submit'>
					Update
				</button>
			</form>
		</div>
	);
};

export default Editarticle;