import React from 'react';
import banner from '../images/banner.png'
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

function Home() {

  

    
  
  
  
  return (
        <main className='home'>
            <motion.div className='home-container' initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1, transition:{duration: .8}}} >
                <h1>ALL ABOUT TREE</h1>
                <img src={banner} alt='banner' />
                <p>
                A new way to explore your city and appretiate its not-so-hidden gems. Easily identify trees, and keep track of your progress.<br/>
                We've got you started with one thousand trees; you've got it from here. Go make the city a forest.
                </p>
                <NavLink to='/map' exact className='button'>Explore Map</NavLink>
            </motion.div>           
        </main>
    )
}

export default Home;
