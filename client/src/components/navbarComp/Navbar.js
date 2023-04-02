import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';

//
const Navbar = () => {
	const { user } = useContext(AuthContext);

	return (
		<div className='navbar'>
			<div className='navContainer'>
				<span className='logo'>
					<Link to='/'>FlywiseBooking</Link>
				</span>

				{/* if user is login */}
				{user ? (
					<div className='navLogin'>
						<span>Welcome, {user.details.username}</span>
						<Link to='/logout'>
							<button className='navButton'>Logout</button>
						</Link>
					</div>
				) : (
					<div className='navLogout'>
						<button className='navButton'>Register</button>
						<Link to='/login'>
							<button className='navButton'>Login</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
