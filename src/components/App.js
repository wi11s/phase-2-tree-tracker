
import './App.css';
import React, {useState, useEffect} from'react';

import {Routes, Route, Link } from "react-router-dom"
// import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import Map from './Map';
import Error from './Error';
import AddTree from './AddTree';
import { useNavigate } from 'react-router-dom'


function App() {



  const [useCustomLocation, setUseCustomLocation] = useState(true)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  function handleLatChange(e) {
    setLatitude(e.target.value)
  }
  function handleLngChange(e) {
    setLongitude(e.target.value)
  }

  let pos;
  function getLocation() {
    console.log(pos)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (useCustomLocation) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          } else {
            pos = {
              lat: parseFloat(latitude),
              lng: parseFloat(longitude)
            }
          }

          console.log(pos)
        }
      )
    }
  }
  getLocation()


  const navigate = useNavigate()
  const apiKey = process.env.REACT_APP_PLANT_KEY

  const [showTreeInfo, setShowTreeInfo] = useState(false)
  const [treeInfo, setTreeInfo] = useState({spc_common: ''})
  const [newTree, setNewTree] = useState({})
  // const [newTreeByName, setNewTreeByName] = useState({})


  const [center, setCenter] = useState({ lat: 40.74, lng: -73.90 })
  const [zoom, setZoom] = useState(12)


  const wiki = require('wikipedia');

  const [wikiLink, setWikiLink] = useState('')
  const [wikiImage, setWikiImage] = useState('')
  const [description, setDescription] = useState('')

  const [name, setName] = useState('')
  function handleNameChange(e) {
    setName(e.target.value)
  }



  (async () => {
    try {
      const page = await wiki.page(name);
      const summary = await page.summary();

      console.log(summary)

      setWikiLink(summary['content_urls'].desktop.page)

      setWikiImage(summary.thumbnail.source)
      
      setDescription(summary.description)
      

    } catch (error) {
      // console.log(error);
    }
  })();

  

  function idPost(base64files) {
    fetch('https://api.plant.id/v2/identify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Api-Key": apiKey
      },
      body: JSON.stringify({
        images: [base64files],
        modifiers: ["similar_images"],
        plant_details: ["common_names", "url"],
        }),
    })
    .then(response => response.json())
    .then(data => {
      // console.log('Success:', data);
      setNewTree({
        spc_common: data.suggestions[0]['plant_name'],
        wiki: data.suggestions[0]['plant_details'].url,
        image: data.images[0].url,
        position: pos,
        suggestions: data.suggestions
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  function encodeImageFileAsURL(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
        idPost(reader.result.slice(23), pos)
    }
    reader.readAsDataURL(file);
  }


  function handleSubmit(e) {
    e.preventDefault()
    if (pos===undefined) {
      alert('please wait for your current location to load')
    } else if (name==='') {
      console.log(newTree, name)
    
      fetch('https://trusted-swanky-whimsey.glitch.me/trees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTree)
      })
      .then(response => response.json())
      .then((obj) => {

        navigate('/map')
        setCenter(pos)
        setZoom(16)
        setTreeInfo({spc_common: obj['spc_common'], wiki: obj.wiki, image: obj.image})
  
        setShowTreeInfo(true)
      })
    } else if (!description.toLowerCase().includes('tree') && !description.toLowerCase().includes('plant')) {
      // console.log(description.includes('plant'))
      alert('Please enter a valid tree name')
    } else {

      let newTreeByName = {
        spc_common: name,
        wiki: wikiLink,
        image: wikiImage,
        position: pos,
      }   
  
      console.log('newtreebyname:', pos)

      fetch('https://trusted-swanky-whimsey.glitch.me/trees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTreeByName)
      })
      .then(response => response.json())
      .then((obj) => {
        console.log('obj', obj)

        navigate('/map')
        setCenter(pos)
        setZoom(16)
        setTreeInfo({spc_common: obj['spc_common'], wiki: obj.wiki, image: obj.image})
  
        setShowTreeInfo(true)
      })
    }
  }


  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="map" element={<Map center={center} zoom={zoom} showTreeInfo={showTreeInfo} setShowTreeInfo={setShowTreeInfo} treeInfo={treeInfo} setTreeInfo={setTreeInfo}/>} />
        <Route path="addtree" element={<AddTree handleSubmit={handleSubmit} encodeImageFileAsURL={encodeImageFileAsURL} pos={pos} handleNameChange={handleNameChange} useCustomLocation={useCustomLocation} setUseCustomLocation={setUseCustomLocation} handleLatChange={handleLatChange} handleLngChange={handleLngChange}/>}/>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
