import React, { useState, useEffect } from 'react'
import TreeType from './TreeType'

export default function ({ treeOptions, trees}) {
    const [points, setPoints] = useState(0)
    const [userTreesArray, setUserTreesArray] = useState([])
    let arr = [];
  
    useEffect(() => {
      fetch('https://trusted-swanky-whimsey.glitch.me/trees')
      .then((res) => res.json())
      .then(obj => {
        obj.map(o => arr.push(o['spc_common'].toLowerCase()))
        setUserTreesArray(arr)
        // console.log(arr)
      })
    }, [setUserTreesArray])

    let total = treeOptions.length
    let pts = userTreesArray.length

    useEffect(() => {
        setPoints(pts)
    }, [pts])



  return (
    <div>
        <h1>You've identifies {points}/{total} species of trees</h1>
        {treeOptions.map(tree => {
            return (
                <TreeType key={tree['spc_common']} tree={tree} trees={trees} userTreesArray={userTreesArray}/>
            )
        })}
    </div>
  )
}
