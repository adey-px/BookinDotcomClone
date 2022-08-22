import React from 'react'

import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featuredCity/FeaturedCity'
import PropertyList from '../../components/featuredType/FeaturedType'
import FeaturedProperties from '../../components/featuredProp/FeaturedProp'
import MailingList from '../../components/mailing/MailingList'
import Footer from '../../components/footer/Footer'
import './home.css'


const Home = () => {
  return (
    <div>

      <Navbar />
      <Header />

      <div className="homeContainer">
        <Featured />

        <h1 className="homeTitle">Browse properties by type</h1>
        <PropertyList />

        <h1 className="homeTitle">Great choices for your comfort</h1>
        <FeaturedProperties />

        <MailingList />
        <Footer />

      </div>

    </div>
  );
};

export default Home;
