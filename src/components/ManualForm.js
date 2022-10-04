import React, {useState} from 'react'

export default function ManualForm() {


  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [wiki, setWiki] = useState('')



    function handleClick() {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              console.log(pos);
            }
          );
        }
      };

      function handleSubmit() {
        let newTree = {
          spc_common: name,
          wiki: wiki,
          image: image,
          position: {
            lat: lat,
            lng: lng,
          }
        }
        fetch('http://localhost:3000/trees', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTree)
        })
      }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Wiki Link" onChange={(e) => setWiki(e.target.value)} />
        <input type="text" placeholder="lat" onChange={(e) => setLat(e.target.value)} />
        <input type="text" placeholder="lng" onChange={(e) => setLng(e.target.value)} />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <input type='submit'/>
      </form>
    </div>
  )
}
