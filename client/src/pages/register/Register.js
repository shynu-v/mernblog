import axios from 'axios';
import React, { useEffect, useState } from 'react';


import './register.css'

const Register = () => {

	const initialValues = { username: "", email: "", password: "", cpassword:"" };
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		setIsSubmit(true);
	};

	useEffect(() => {
		console.log(formErrors);
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			const res =  axios.post("/user/reg", {
					name:formValues.username,
					email:formValues.email,
					passwd:formValues.cpassword,
				});
				console.log(res.data)
				window.location.replace("/login");
		}
	}, [formErrors]);
	const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.username) {
			errors.username = "Username is required!";
		}
		if (!values.email) {
			errors.email = "Email is required!";
		} else if (!regex.test(values.email)) {
			errors.email = "This is not a valid email format!";
		}
		if (!values.password) {
			errors.password = "Password is required";
		} else if (values.password.length < 4) {
			errors.password = "Password must be more than 4 characters";
		}
		if(values.cpassword !== values.password){
			errors.cpassword = "Password did not match";
		}
		return errors;
	};
		
		return (
			<div className='register'>
				<span className='registerTitle'>Register</span>
				<form className='registerForm' onSubmit={handleSubmit}>
					<label>Username</label>
					<input
						type='text'
						name='username'
						className='registerInput'
						placeholder='Enter your username...'
						value={formValues.username}
						onChange={handleChange}
					/>
					<p>{formErrors.username}</p>
					<label>Email</label>
					<input
						type='text'
						name='email'
						className='registerInput'
						placeholder='Enter your email...'
						value={formValues.email}
						onChange={handleChange}
					/>
					<p>{formErrors.email}</p>
					<label>Password</label>
					<input
						type='password'
						name='password'
						className='registerInput'
						placeholder='Enter your password...'
						value={formValues.password}
						onChange={handleChange}
					/>
					<p>{formErrors.password}</p>
					<label>Confirm Password</label>
					<input
						type='password'
						name='cpassword'
						className='registerInput'
						placeholder='Enter your password...'
						value={formValues.cpassword}
						onChange={handleChange}
					/>
					<p>{formErrors.cpassword}</p>
					<button className='registerButton' type='submit'>
						Register
					</button>
				</form>
				{/* <button className='registerLoginButton'>
					<Link className='link' to='/login'>
						Login
					</Link>
				</button> */}
			</div>
		);
};

export default Register;