import { IDLE_NAVIGATION } from '@remix-run/router'
import React, {useState} from 'react'

export default function TreeInfo({info}) {
    console.log(info)
  return (
    <div>
        <h1>{info['spc_common']}</h1>
        <a href={info.wiki} target="_blank" rel="noopener noreferrer">More Info</a>
        <img src={info.image}/>
    </div>
  )
}
