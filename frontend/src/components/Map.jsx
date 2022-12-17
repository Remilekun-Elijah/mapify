import React from 'react';
import { MapContainer, Marker, Popup, TileLayer,  } from "react-leaflet";
import { Link } from 'react-router-dom';

const Map = ({center, mapData, setModal, setLocationId}) => {
 return (
  <MapContainer className='z-0' center={center} zoom={11} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   {mapData.map((data, key)=>{
     const {description, image, longitude, latitude} = data;

 return (
  
 <Marker {...{ key, position: {lat: latitude, lng: longitude} }} >

      <Popup>
        {<div className="flex flex-col">
        <span>{description}</span>
          <div className="flex justify-between">
          {image ? <a target="_blank" rel="noreferrer" className="text-end" href={image}>Open image </a>
          : <span className="text-end text-blue-700 cursor-pointer" onClick={_=> {
            setLocationId(data._id)
            setModal(true)
          }}>Upload Image</span>}

          <Link className="text-end" to={`/locations/${data._id}`} state={data}>View Details </Link>
          </div>
         </div>}
      </Popup>
    </Marker>
 )
 })
}
  </MapContainer>
 );
}

export default Map;
