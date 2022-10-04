import React, { useState } from "react";
import { motion } from 'framer-motion';
import tree from '../images/treee.png'

function Map() {
    const [isClicked, setIsClicked] = useState(false);

    function handleClick() {
        setIsClicked(isClicked => !isClicked);
    }

    return (
        <main className="map">
            <motion.div className='container' initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1, transition:{duration: .8}}}>
                <h1>EXPLORE MAP</h1>

                <div className="feature">
                    <div className={`map-container ${isClicked ? '' : 'map-container-full'}`} onClick={handleClick}></div>
                    <div className={`card ${isClicked ? '' : 'card-none'}`}>
                        <div className="details">
                            Silver Oak
                        </div>
                        
                        <div className="details">
                            <h4>Health</h4>
                            <p>Good</p>
                        </div>

                        <div className="details">
                            <h4>Description</h4>
                            <p>The largest species in its genus but is not closely related to the true oaks, Quercus. It is a native of eastern coastal Australia, growing in riverine, subtropical and dry rainforest environments.</p>
                        </div>

                        <div className="details">
                            <h4>Location</h4>
                            <p>Manhatten, NY</p>
                        </div>
                        
                        <div className="image-container">
                            <img src={tree} alt='image'/>
                        </div>
                    </div>
                </div>
            </motion.div>
        </main>
    )
}

export default Map;