import React, { useState } from "react";
import { motion } from "framer-motion";
import { UNSAFE_DataRouterStateContext } from "react-router-dom";

function AddTreeForm({setIsManual}) {
    const [useCustomLocation, setUseCustomLocation] = useState(true);

    function handleCheckBox() {
        setUseCustomLocation(useCustomLocation => !useCustomLocation)
    }

    return (
        <main className='add-tree'>
      <motion.div className='form-container' initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1, transition:{duration: .8}}}>
        <div className='title'>ADD TREE</div>
        <hr></hr>
        <form>
          <div className="details">
            <div className="input-box">
              <div className="check-box">
                <span className='sub-head'>Use Current Location</span>
                <input type='checkbox' onChange={handleCheckBox} checked={useCustomLocation}/>
              </div>
              {useCustomLocation ? 
              null :
              <>
              <input type='text' placeholder='Enter X' />
              <input type='text' placeholder='Enter Y' />
              </>}
            </div>

            <div className="upload-img">
              <span className='sub-head'>Upload Image</span>
              <input type='file' />
            </div>

            <div className='submitBtn'>
              <input type="submit" value='Submit'/>
            </div>

            <div className='manual-input'>
              <button type="button" onClick={() => setIsManual(true)}>
                Manual Input
              </button>
              </div>
          </div>
        </form>
      </motion.div>
    </main>
    )
}

export default AddTreeForm;