import React from 'react';
import { MapContainer, Marker, Popup, TileLayer,  } from "react-leaflet";
import { Link } from 'react-router-dom';
import Loader from "./Loader/Loader"

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
  
 <Marker {...{ key, position: {lat: latitude, lng: longitude} }}>
{/* <div className='relative border-3'> */}
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

      <Loader className={'absolute top-[40%] bottom-10 left-5 right-5'}/>
      {/* </div> */}
    </Marker>
 )
 })
}
  </MapContainer>
 );
}

export default Map;
