import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, Circle } from "react-leaflet";

const Map = ({center, mapData}) => {
 return (
  <MapContainer center={center} zoom={15} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   {mapData.map((data, key)=>{
  const {addr, img, ...position} = data;

 return (
  
 <Marker {...{ key, position }} >
  {/* <Circle
  { ...{
    center,
    pathOptions: {fillColor: 'red'},
    radius: 650,
    stroke: false
  }}
  /> */}

      <Popup>
        {<div className="flex flex-col">
        <span>{addr}</span>
          <a target="_blank" rel="noreferrer" className="text-end" href={img}>Open image </a>
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
