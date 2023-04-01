import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthsContext } from '../../contextApi/AuthsContext';
import './userLogin.css';

const UserLogin = () => {
	const [credentials, setCredentials] = useState({
		username: undefined,
		password: undefined,
	});

	// From AuthsContext, also used in navbar login
	const { loading, error, dispatch } =
		useContext(AuthsContext);

	const inputHandler = (e) => {
		setCredentials((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	// If login succeeds, to redirect
	const navigate = useNavigate();

	// Login button
	const loginBtn = async (e) => {
		e.preventDefault();
		dispatch({ type: 'LOGIN_START' });
		try {
			const res = await axios.post(
				'/auths/login',
				credentials
			);
			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: res.data.details,
			});
			navigate('/');
		} catch (err) {
			dispatch({
				type: 'LOGIN_FAILURE',
				payload: err.response.data,
			});
		}
	};

	return (
		<div className='login'>
			<div className='lContainer'>
				<h2 className='lHeader'>Login</h2>

				{/* If error, display error message */}
				{error && (
					<h4 className='error'>{error.message}</h4>
				)}

				<input
					type='text'
					id='username'
					placeholder='Username'
					className='lInput'
					onChange={inputHandler}
				/>

				<input
					type='password'
					id='password'
					placeholder='Password'
					className='lInput'
					onChange={inputHandler}
				/>

				<button
					className='lButton'
					disabled={loading}
					onClick={loginBtn}
				>
					Login
				</button>

				<Link
					to='/'
					className='homeLink'
				>
					<h4>Return to Home page</h4>
				</Link>
			</div>
		</div>
	);
};

export default UserLogin;
