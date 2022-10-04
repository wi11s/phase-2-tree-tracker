import { IDLE_NAVIGATION } from '@remix-run/router'
import React, {useState} from 'react'

export default function TreeInfo({info}) {
    console.log(info)
  return (
    <div>
        <div className='details'>{info['spc_common']}</div>
        <div className="details">
          <h4>Health</h4>
          <p>Good</p>
        </div>
        <div className="details">
          <h4>Description</h4>
          <p>The largest species in its genus but is not closely related to the true oaks, Quercus. It is a native of eastern coastal Australia, growing in riverine, subtropical and dry rainforest environments.</p>
          <a href={info.wiki} target="_blank" rel="noopener noreferrer">More Info</a>
        </div>

        <div className="image-container">
          <img src={info.image} alt='image'/>
        </div>
    </div>
  )
}
