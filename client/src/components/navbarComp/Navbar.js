import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import './navbar.css';

const Navbar = () => {
	// From AuthContext
	const { user } = useContext(AuthContext);

	return (
		<div className='navbar'>
			<div className='navContainer'>
				<span className='logo'>
					<Link to='/'>FlywiseBooking</Link>
				</span>

				{user ? (
					['Hello, ', user.username]
				) : (
					<div className='navItems'>
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
