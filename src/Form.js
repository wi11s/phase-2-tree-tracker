import React, {useState} from 'react'
import ManualForm from './ManualForm';

export default function Form() {

    const apiKey = process.env.REACT_APP_PLANT_KEY

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


  return (
    <div>
        <h1>Form</h1>
        <input type="file" onChange={encodeImageFileAsURL} />
        <label>Manual Input</label>
        <input type='checkbox' onChange={handleCheck} />
        {formThere ? <ManualForm/> : null}
    </div>
  )
}
