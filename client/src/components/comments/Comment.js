import React from 'react';
import "./comment.css"

const Comment = ({comments}) => {
    return (
			<div className='comment'>
				<h3>Comments</h3>
				{comments.map((comment, key) => (
					<div key={key}>
						<h5>{comment.username} :</h5>
						<p> {comment.txt}</p>
					</div>
				))}
			</div>
		);
};

export default Comment;