import React, {useState} from 'react'
import ManualForm from './ManualForm';

export default function AddTree() {

    const apiKey = process.env.REACT_APP_PLANT_KEY
    const [newTree, setNewTree] = useState({})
    const [useCustomLocation, setUseCustomLocation] = useState(false)




    let pos;

    if (!useCustomLocation) {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              console.log(pos);
            }
          );
        }
      }



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
          console.log('Success:', data);
          setNewTree({
            spc_common: data.suggestions[0]['plant_name'],
            wiki: data.suggestions[0]['plant_details'].url,
            image: data.images[0].url,
            position: pos
          })
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
      
    
    function encodeImageFileAsURL(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        idPost(reader.result.slice(23))
    }
    reader.readAsDataURL(file);
    }

    const [formThere, setFormThere] = useState(false)
    function handleCheck(e) {
        setFormThere(e.target.checked)
    }

    function handleSubmit() {
        fetch('http://localhost:3000/trees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTree)
        })
    }

    function handleUseCustomLocChange() {
        setUseCustomLocation(!useCustomLocation)
    }


  return (
    <div>
        <h1>Form</h1>
        <form onSubmit={handleSubmit}>
            <label>Use Custom Location</label>
            <input type="checkbox" onChange={handleUseCustomLocChange}/>
            {useCustomLocation ? <input type="text"/> : null}
            <input type="file" onChange={encodeImageFileAsURL} />
            <input type="submit"/>

            <label>Manual Input</label>
            <input type='checkbox' onChange={handleCheck} />
            
        </form>

        {formThere ? <ManualForm/> : null}
    </div>
  )
}
