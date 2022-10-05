import React, {useState} from 'react'
import AddTreeForm from './AddTreeForm';
import { motion } from 'framer-motion';


export default function AddTree({handleSubmit, encodeImageFileAsURL, handleNameChange, useCustomLocation, setUseCustomLocation, handleLatChange, handleLngChange }) {

  return (
    <div className='add-tree'>
      <motion.div className='form-container' initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1, transition:{duration: .8}}}>
      <div>
        <AddTreeForm handleSubmit={handleSubmit} encodeImageFileAsURL={encodeImageFileAsURL} handleNameChange={handleNameChange} useCustomLocation={useCustomLocation} setUseCustomLocation={setUseCustomLocation} handleLatChange={handleLatChange} handleLngChange={handleLngChange}/>
      </div>
      </motion.div>
    </div>
  )
}