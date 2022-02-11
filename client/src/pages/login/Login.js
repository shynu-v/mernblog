import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => {

	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [passwd, setPassword] = useState("");
	const [message, setmsg] = useState("");
	const [submited, setsubmited] = useState(false);

	const handleSubmit = async (e) => {
			e.preventDefault();
			try {
				const res = await axios.post("/user/login",{
					email:email,
					passwd:passwd
				}, {
					headers: {
						"Content-Type": "application/json"
					},
				})
				localStorage.setItem("token", res.data.token)
				setmsg(res.data.message)
				
			} catch (err) {
				console.log(err);
			}
			setsubmited(true)
			window.location.reload(false);
			
		};


	useEffect(()=>{
		axios
			.get("/user/getname", {
				headers: {
					"x-access-token": localStorage.getItem("token"),
				},
			})
			.then((res) =>{
				return res.data.loggedin ? navigate("/") : null
			});
	},[submited])

		return (
			<div className='login'>
				<span className='loginTitle'>Login</span>
				<form className='loginForm' onSubmit={handleSubmit}>
					<label>Email</label>
					<input
						type='text'
						className='loginInput'
						placeholder='Enter Email...'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label>Password</label>
					<input
						type='password'
						className='loginInput'
						placeholder='Enter your password...'
						value={passwd}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className='loginButton' type='submit'>
						Login
					</button>
				</form>
				{message === "Success" ? 
					<span style={{ color: "green", marginTop: "10px" }}>{message}</span>
				: 
					<span style={{ color: "red", marginTop: "10px" }}>{message}</span>
				}
			</div>
		);
};

export default Login;