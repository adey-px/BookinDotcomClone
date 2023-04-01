import React from 'react';
import NavbarComp from '../../components/navbarComp/Navbar';
import HeaderComp from '../../components/headerComp/Header';
import FeaturedCity from '../../components/featuredCity/FeaturedCity';
import FeaturedType from '../../components/featuredType/FeaturedType';
import FeaturedProp from '../../components/featuredProp/FeaturedProp';
import MailingList from '../../components/mailingComp/MailingComp';
import FooterComp from '../../components/footerComp/Footer';
import './homePage.css';

//
const HomePage = () => {
	return (
		<div>
			<NavbarComp />
			<HeaderComp />

			<div className='homeContainer'>
				<FeaturedCity />

				<h1 className='homeTitle'>
					Browse properties by type
				</h1>
				<FeaturedType />

				<h1 className='homeTitle'>
					Great choices for your comfort
				</h1>
				<FeaturedProp />

				<MailingList />
				<FooterComp />
			</div>
		</div>
	);
};

export default HomePage;
