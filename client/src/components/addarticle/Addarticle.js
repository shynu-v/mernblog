import axios from 'axios';
import React, { useState } from 'react';
import "./addarticle.css"

const Addarticle = ({user}) => {

    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");

    const handleSubmit = async (e) => {
			e.preventDefault();
			const newPost = {
				name: user,
				title: title,
				content: content,
			};
		
			try {
				 await axios.post("/admin/article/add", newPost, {
					headers: {
						"Content-Type": "application/json",
					},
				});
				window.location.replace("/article");
			} catch (err) {}
		};
		return (
			<div className='write'>
				<form className='writeForm' onSubmit={handleSubmit}>
					<div className='writeFormGroup'>
						<input
							type='text'
							placeholder='Title'
							className='writeInput'
							autoFocus={true}
							onChange={(e) => settitle(e.target.value)}
						/>
					</div>
					<div className='writeFormGroup'>
						<textarea
							placeholder='Tell your story...'
							type='text'
							className='writeInput writeText'
							onChange={(e) => setcontent(e.target.value)}
						></textarea>
					</div>
					<button className='writeSubmit' type='submit'>
						ADD
					</button>
				</form>
			</div>
		);
};

export default Addarticle;