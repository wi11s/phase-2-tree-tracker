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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit culpa aspernatur velit tenetur suscipit. <br/>
                tempora incidunt et, illo laborum eveniet nesciunt quibusdam debitis.
                </p>
                <NavLink to='/map' exact className='button'>Explore Map</NavLink>
            </motion.div>           
        </main>
    )
}

export default Home;