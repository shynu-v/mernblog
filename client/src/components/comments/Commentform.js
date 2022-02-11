import axios from 'axios';
import React, { useState } from 'react';
import "./comment.css"

const Commentform = ({id, user, setcmmt}) => {
    
		const [cmt, setcmtxt] = useState("");

		const addcomment = async () => {
			
            const result = await axios.post(`/api/articles/${id}/comment`,{ username: user, txt:cmt },{
								headers: {
									"Content-Type": "application/json",
								},
							}
						);
			const body = await result.data;
			setcmmt({comments:body});
			setcmtxt("");
		};
		return (
			<div id='add-comment-form'>
				<h4>Add Comment</h4>

				<label>
					Comment:{" "}
					<textarea
						rows='4'
						cols='50'
						value={cmt}
						onChange={(event) => setcmtxt(event.target.value)}
					/>
				</label>

				<button onClick={addcomment}>Add Comment</button>
			</div>
		);
};

export default Commentform;