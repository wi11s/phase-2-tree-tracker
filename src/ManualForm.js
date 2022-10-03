import React from 'react'

export default function ManualForm() {


    function handleNameChange() {

    }
    function handleAddressChange() {

    }
    function handleImageChange() {

    }



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

  return (
    <div>
        <input type="text" placeholder="Name" onChange={handleNameChange} />
        <input type="text" placeholder="Address" onChange={handleAddressChange} />
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleClick}>Use Current Location</button>
    </div>
  )
}
