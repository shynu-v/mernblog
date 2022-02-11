import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Deleteart = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const delart = async () => {
			const result = await axios.delete(
				`/admin/article/${id}/delete`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const body = await result.data;
            alert(body)
            navigate(`/article`);
		};
    const donothing = ()=>{
        navigate(`/article/${id}`)
    }
    
    return (
        <div>
            <p>Are You Sure to Delete this Article ?</p>
            <button onClick={delart}>Delete</button>
            <button onClick={donothing}>Cancel</button>
        </div>
    );
};

export default Deleteart;