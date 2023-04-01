import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './userLogin.css';

//
const UserLogin = () => {
	const [credentials, setCredentials] = useState({
		username: undefined,
		password: undefined,
	});

	/* from AuthContext, also used in navbar login */
	const { user, loading, error, dispatch } =
		useContext(AuthContext);

	/* input handler */
	const inputHandler = (e) => {
		setCredentials((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	// to redirect, if login succeeds
	const navigate = useNavigate();

	// login handler
	const loginHandler = async (e) => {
		e.preventDefault();
		dispatch({ type: 'LOGIN_START' });
		try {
			const res = await axios.post(
				'/auths/login',
				credentials
			);
			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: res.data,
			});

			navigate('/');
		} catch (err) {
			dispatch({
				type: 'LOGIN_FAILURE',
				payload: err.response.data,
			});
		}
	};

	console.log(user);

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
					disabled={loading}
					onClick={loginHandler}
					className='lButton'
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
