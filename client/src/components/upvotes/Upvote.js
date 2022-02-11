import axios from "axios";
import React from "react";


const Upvote = ({ articlename, userId, vote, setupvote}) => {

	const upvote = async () => {
		const result = await axios.post(`/api/articles/${articlename}/upvote`,{userId: userId},{
					headers: {
						"Content-Type": "application/json",
					},
				});
		const body = await result.data;
        setupvote({upvotes:body})
	};
	return (
		<div >
			<button onClick={upvote}>Upvote</button>
			<p>This article has {vote} upvotes</p>
		</div>
	);
};

export default Upvote;
