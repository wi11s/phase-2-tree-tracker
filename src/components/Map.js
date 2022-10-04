import React, { useState, useEffect, useRef, ReactElement } from "react";
import {useJsApiLoader, GoogleMap, Marker} from "@react-google-maps/api"
import TreeInfo from "./TreeInfo";
import { useInRouterContext } from "react-router-dom";
import { motion } from 'framer-motion'


// const center = { lat: 40.74, lng: -73.90 }

export default function Map() {


  const [center, setCenter] = useState({ lat: 40.74, lng: -73.90 })



  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY
  })

  const [trees, setTrees] = useState([])
  const [userTrees, setUserTrees] = useState([])
  const [showTreeInfo, setShowTreeInfo] = useState(false)

  useEffect(() => {
    fetch('https://data.cityofnewyork.us/resource/5rq2-4hqu.json')
    .then((res) => res.json())
    .then(obj => {
      // console.log(obj.length)
      setTrees(obj)
    })
  }, [setTrees])

  useEffect(() => {
    fetch('http://localhost:3000/trees')
    .then((res) => res.json())
    .then(obj => {
      // console.log(obj.length)
      setUserTrees(obj)
    })
  }, [setUserTrees])


  const [treeInfo, setTreeInfo] = useState({spc_common: ''})
  const [opens, setOpens] = useState(0)
  const [treeId, setTreeId] = useState(0)

  function handleClick(tree) {
    console.log(treeId, tree['tree_id'], tree['tree_id'] === treeId, opens===0)

    if (treeId === tree['tree_id']) {
      setShowTreeInfo(!showTreeInfo)
    } else if (opens===0) {
      setShowTreeInfo(true)
    } else if (treeId !== tree['tree_id']) {
      setShowTreeInfo(true)
    }

  
    setOpens(1)
    setTreeId(tree['tree_id'])
    
    
    setTreeInfo({spc_common: tree['spc_common']})
  }

  function handleUserTreeClick(tree) {

    if (opens===0) {
      setShowTreeInfo(true)
    } else if (treeId === tree['tree_id']) {
      setShowTreeInfo(false)
    } else if (treeId !== tree['tree_id']) {
      setShowTreeInfo(true)
    }

    let newOpens = opens +1
    setOpens(newOpens)
    setTreeId(tree['tree_id'])
    
    
    setTreeInfo({spc_common: tree['spc_common'], wiki: tree.wiki, image: tree.image})
  }


  if (!isLoaded) {
    return <p>loading</p>
  }
  return (
    <main className="map">
      <motion.div className='container' initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1, transition:{duration: .8}}}>
        <h1>EXPLORE MAP</h1>
        <div className="feature">
          <div className={`map-container ${showTreeInfo ? '' : 'map-container-full'}`}>
          <GoogleMap center={center} zoom={12} mapContainerStyle={{ width: '100%', height: '100%'}}>
              {trees.map(tree => {           
                return (
                  <Marker onClick={() => handleClick(tree)} key={tree["tree_id"]} position={{ lat:parseFloat(tree.latitude), lng:parseFloat(tree.longitude)}}/>
                )
              })}
              {userTrees.map(tree => {
                return (
                  <Marker onClick={() => handleUserTreeClick(tree)} key={tree.id} position={{ lat:parseFloat(tree.position.lat), lng:parseFloat(tree.position.lng)}}/>
                )
              })}
            </GoogleMap>
          </div>
          <div className={`card ${showTreeInfo ? '' : 'card-none'}`}>
            {showTreeInfo ? <TreeInfo info={treeInfo}/> : null} 
          </div>
        </div>
        
        
      </motion.div>
    </main>

  )
}


 